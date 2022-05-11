# This makefile is only intended for local deployments
# WARNING: It will destroy your current ~/.kube/config
# Please make backup before running this Makefile

SHELL=/bin/bash
KUBECTL_BIN = $(shell which kubectl)
HELM_BIN = $(shell which helm)
KIND_BIN = $(shell which kind)
CONTAINER_TEST_BIN = $(shell which container-structure-test)
DOCKER_BIN = $(shell which docker)
LOCAL_CLUSTER_NAME = k8s-local
APP = creativesolutions
HELM_CHARTS_FOLDER = "./helm_manifests"
NAMESPACE = creativesolutions
DEFAULT_IMAGE = seyio/creativesolutions
DEFAULT_TAG = v0.01
APP_DIR = ./api
LOCAL_TOOLS_FOLDER = ./local-env-config
MONGO_IMAGE = bitnami/mongodb:5.0.8-debian-10-r10

# kind create cluster --image=....

.PHONY: install_kind_cluster destroy_kind_cluster deploy_ingress install_opa build_test_image test_application_image build_application_image load_local_images deploy_application uninstall_application

all: install_kind_cluster deploy_ingress install_opa build_test_image test_application_image build_application_image load_local_images deploy_application 


# Install Kind Cluster on your local machine
.ONESHELL:
install_kind_cluster:
	@echo "Checking requirements ..."
ifeq ($(KUBECTL_BIN),)
	$(error Cannot find kubectl! Please install it from: https://kubernetes.io/docs/tasks/tools/)
endif

ifeq ($(HELM_BIN),)
	$(error Cannot find helm binary! Please install it from: https://helm.sh)
endif

ifeq ($(KIND_BIN),)
	$(error Cannot find Kind binary! Please install it from: https://kind.sigs.k8s.io/)
endif

ifeq ($(DOCKER_BIN),)
	$(error Cannot find Docker binary! )
endif

ifeq ($(CONTAINER_TEST_BIN),)
	$(error Cannot find container-structure-test binary! Please install it)
endif
	$(KIND_BIN) get clusters | grep $(LOCAL_CLUSTER_NAME) || $(KIND_BIN) create cluster --name $(LOCAL_CLUSTER_NAME) --config ./local-env-config/kind-config.yaml
	$(KIND_BIN) get kubeconfig --name $(LOCAL_CLUSTER_NAME) > ~/.kube/config
	$(KUBECTL_BIN) config use-context kind-$(LOCAL_CLUSTER_NAME)
	
	@echo "Requirements looks good and installed :)"


# Destroy Kind Cluster from local machine
.ONESHELL:
destroy_kind_cluster:
	@$(KIND_BIN) delete cluster --name $(LOCAL_CLUSTER_NAME)

# Load locally built images into Kind
# Mongodb was loaded to compensate for slow internet speed
.ONESHELL:
load_local_images:
	@make -s seperator_line PLACEHOLDER="Loading Local Images ..."
ifndef IMAGE
	@echo "Image name not found specified, using default image seyio/creativesolutions"
	$(eval IMAGE="$(DEFAULT_IMAGE):$(DEFAULT_TAG)")
endif
	@kind load docker-image --name $(LOCAL_CLUSTER_NAME) $(IMAGE)
	@$(DOCKER_BIN)  pull $(MONGO_IMAGE)
	@kind load docker-image --name $(LOCAL_CLUSTER_NAME) $(MONGO_IMAGE)


.ONESHELL:
deploy_ingress: install_kind_cluster
	@make -s seperator_line PLACEHOLDER="Installing Traefik Ingress Controller ..."
	$(KUBECTL_BIN) get namespace traefik || $(KUBECTL_BIN) create namespace traefik
	$(HELM_BIN) repo add traefik https://helm.traefik.io/traefik
	$(HELM_BIN) repo update
	$(HELM_BIN) -n traefik upgrade -i traefik traefik/traefik -f $(LOCAL_TOOLS_FOLDER)/traefik-values.yaml
	@echo "Done."

.ONESHELL:
deploy_application: install_kind_cluster
	@echo "Making sure the namespace exists ..."
	$(KUBECTL_BIN) get namespace $(NAMESPACE) || ($(KUBECTL_BIN) create namespace $(NAMESPACE))
ifndef IMAGE
	@echo "Image name not found specified, using default image seyio/creativesolutions"
	$(eval IMAGE="$(DEFAULT_IMAGE):$(DEFAULT_TAG)")
endif
	$(HELM_BIN) upgrade -i $(APP) $(HELM_CHARTS_FOLDER) --set backend.image.repository=$(IMAGE) -n $(NAMESPACE) --wait
	@echo "Testing Helm Release"
	$(HELM_BIN) test $(APP) -n $(NAMESPACE)
	@echo "Done"

.ONESHELL:
install_opa:
	@echo "Installing Gatekeeper OPA ..."
	$(HELM_BIN) repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
	$(HELM_BIN) repo update
	$(HELM_BIN) install gatekeeper/gatekeeper --name-template=gatekeeper --namespace gatekeeper-system --create-namespace
	@echo "Done"

.ONESHELL:
build_application_image:
	@make -s seperator_line PLACEHOLDER="Building Application Image"
ifndef IMAGE
	@echo "Image name not found specified, using default image seyio/creativesolutions"
	$(eval IMAGE="$(DEFAULT_IMAGE):$(DEFAULT_TAG)")
endif
	@echo "Building Application Image ..."
	cd $(APP_DIR) && $(DOCKER_BIN) build -t $(IMAGE) .

.ONESHELL:
build_test_image:
	@echo "Building Test Image ..."
	cd $(APP_DIR) && $(DOCKER_BIN) build -t $(APP)-test . -f Dockerfile.test

.ONESHELL:
build_push_image:
	@make -s seperator_line PLACEHOLDER="Building and Pushing Application Image"
ifndef IMAGE
	@echo "Image name not found specified, using default image seyio/creativesolutions"
	$(eval IMAGE="$(DEFAULT_IMAGE):$(DEFAULT_TAG)")
endif
	@make -s build_application_image IMAGE=$(IMAGE)
	$(DOCKER_BIN) push $(IMAGE)

# Application Test was also Bundled here
.ONESHELL:
test_application_image:
	@make -s seperator_line PLACEHOLDER="Test Application Image"
	$(CONTAINER_TEST_BIN) test --image $(APP)-test --config ./$(LOCAL_TOOLS_FOLDER)/config.yaml

seperator_line:
	@echo -e "#############################\n## $(PLACEHOLDER) ##\n#############################"


.ONESHELL:
uninstall_application:
	@make -s seperator_line PLACEHOLDER="Test Application Image"
	$(HELM_BIN) uninstall $(APP) -n $(NAMESPACE)