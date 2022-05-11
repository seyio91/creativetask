{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "creativesolutions.name" -}}
{{- default .Values.name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "creativesolutions.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "creativesolutions.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "creativesolutions.deploymentname" -}}
{{- printf "%s-deployment" .Release.Name -}}
{{- end }}

{{- define "creativesolutions.servicename" -}}
{{- printf "%s-service" .Release.Name -}}
{{- end }}

{{- define "creativesolutions.databasename" -}}
{{- printf "%s-database" .Release.Name -}}
{{- end }}

{{- define "creativesolutions.dbservicename" -}}
{{- printf "%s-db-service" .Release.Name -}}
{{- end }}

{{- define "creativesolutions.secretname" -}}
{{- printf "%s-secret" .Release.Name -}}
{{- end }}

{{- define "creativesolutions.jobname" -}}
{{- printf "%s-job" .Release.Name -}}
{{- end }}

{{/*
Common labels
*/}}
{{- define "creativesolutions.labels" -}}
helm.sh/chart: {{ include "creativesolutions.chart" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "creativesolutions.selectorLabels" -}}
app.kubernetes.io/name: {{ include "creativesolutions.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/projectname: {{ required "a projectname is required" .Values.projectname }}

{{- end }}

{{- define "creativesolutions.dbSelectorLabels" -}}
{{ include "creativesolutions.selectorLabels" . }}
app.kubernetes.io/tier: {{ required "frontend/backend/database" .Values.database.tier }}
{{- end }}

{{- define "creativesolutions.dbLabels" -}}
{{ include "creativesolutions.selectorLabels" . }}
{{ include "creativesolutions.labels" . }}
app.kubernetes.io/tier: {{ required "frontend/backend/database" .Values.database.tier }}
{{- end }}

{{- define "creativesolutions.appLabels" -}}
{{ include "creativesolutions.selectorLabels" . }}
{{ include "creativesolutions.labels" . }}
app.kubernetes.io/tier: {{ required "frontend/backend/database" .Values.backend.tier }}
{{- end }}

{{- define "creativesolutions.appSelectorLabels" -}}
{{ include "creativesolutions.selectorLabels" . }}
app.kubernetes.io/tier: {{ required "frontend/backend/database" .Values.backend.tier }}
{{- end }}