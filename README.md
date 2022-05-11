# Creative Solutions User API
This repository serves a user api through the use of a local kind kubernetes cluster

You need to install `kubectl`, `kind` , `container-structure-test` and `helm` binaries manually to deploy the api in a local kubernetes cluster.


# API
- CreateUser
- Get Single User by Email
- Get all users
- Load User in json data

# Technologies
- Nodejs
- Express
- Jest
- Mongodb
- Kind
- Kubernetes
- Makefile
- Helm


# Running the API
## Requirements and Installation

To install and run this project you would need to have Node.js installed.

- Create a .env file in the root directory of the cloned project and add the following:
  - MONGO_URI=<mongouri>
  - ROUNDS=<Number of rounds to hash password>
  - NODE_ENV=<nodeenvironment>

- To run:

```sh
cd api
npm install
npm run start
```

## Testing

```sh
npm run test
```

## API-ENDPOINTS

   ## USERS
   
`- POST /api/createUser Create user account`

```json
{
	"first_name": "obaweya",
	"last_name": "dayo",
	"email": "sesan@yahoo.com",
	"password": "randompassword"
}
```

`- POST /api/singleUser Get a single User`

```json
{
	"email":"admin@gmail.com"
}
```

`- GET /api/ Get all Users`

`- GET /api/health Get a single User`


# Deployment
### 1. Docker Compose
```sh
docker-compose up -d
```
This exposes the api on (http://localhost:8080/api/health)[http://localhost:8080/api/health]


### 2. Kind Deployment
***Note: This makefile is only intended for local deployments***  
***WARNING: It will destroy your current ~/.kube/config***  
***Please make backup before running this Makefile***  

### Quick Start

To Skip going through each individual configuration, the following command deploys a kind cluster and installs the helm chart with all its dependencies

```sh
make
```

Running application can be accessed on http://localhost/api/health


## Manual Deployment

Next, follow these steps to create your cluster (Make a backup of your ~/.kube/config first):

1. `make install_kind_cluster`  
Create the Kind Cluster.


2. `make deploy_ingress`  
Deploys the ingress controller in the Kind Cluster. The Traefik Ingress Controller is used

3. `make install_opa`  
Install the Open policy agents in the Cluster by install the Gatekeeper OPA helm chart as well as the Constrainst in the `opa` foler

4. `make build_test_image`  
The instruction builds the code into a larger docker container which has support for the testing tools. this will later used to test the application image

5. `make test_application_image`  
The container-structure-test tool is used to test the following conditions
    - node and npm is installed
    - package.json file exists
    - user in container is not root

    The stage also doubles as a test phase as it runs the npm tests in the container

6. `make build_application_image`  
The container to be deployed is built, with a smaller footprint and in production mode. This container will be deployed to the kind cluster  
This can be customized to create new images by using the `IMAGE` variable

    ```sh
    IMAGE=seyio/newimage:v10 make build_application_image
    ```

7. `make load_local_images`  
This stage was created to allow quick development, this allows the developer to make changes and load the image into the kind cluster without having to push to dockerhub  
This can be customized to push new images by using the `IMAGE` variable

    ```sh
    IMAGE=seyio/newimage:v10 make load_local_images
    ```

### Deploying your application

8. `make deploy_application`
This deploys the Application helm chart which has been created to deploy the user api  
This can be customized to deploy new images by using the `IMAGE` variable

    ```sh
    IMAGE=seyio/newimage:v10 make deploy_application
    ```

View the application using:
`https://localhost/api/health`

Considerations for Productions
- The code was written to abstract the database layer from the application, allowing the db to be switched at any point, however the Helm chart was strictly hardcoded to support mongodb. Additional conditionals should be placed to consider database engines when deploying the helm chart
- Secrets Management- No secret management method was used and auth was disabled for the database. In Production, secrets will be stored using sealed secrets/ vault or sops. 
- Startup Probes were not used. The application might fail while waiting for the MongoDB to be up depending on the internet speed. probes or init containers can be used to check if the db is up before the deployment of the application pod
- Better Documentation
- CI/CD can be added using a couple of options. i did not go into that as the focus was only on local deployment