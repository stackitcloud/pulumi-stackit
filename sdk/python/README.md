# STACKIT Resource Provider

![logo.svg](docs/logo.svg)

The STACKIT Resource Provider lets you manage [STACKIT](https://www.stackit.de/en/) resources.

## Installing

This package is available for several languages/platforms:

### Node.js (JavaScript/TypeScript)

To use from JavaScript or TypeScript in Node.js, install using either `npm`:

```bash
npm install @ediri/stackit
```

or `yarn`:

```bash
yarn add @ediri/stackit
```

### Python

To use from Python, install using `pip`:

```bash
pip install ediri_stackit
```

### Go

To use from Go, use `go get` to grab the latest version of the library:

```bash
go get github.com/dirien/pulumi-stackit/sdk
```

### .NET

To use from .NET, install using `dotnet add package`:

```bash
dotnet add package ediri.stackit
```

## Configuration

The following configuration points are available for the `stackit` provider:

| Configuration Variable | Environment Variable | Description |
|------------------------|---------------------|-------------|
| `stackit:argusCustomEndpoint` | `STACKIT_ARGUS_CUSTOM_ENDPOINT` | Custom endpoint for the Argus service ⚠️ **Deprecated**: Argus service has been deprecated and integration will be removed after February 26th 2025. Please use `observability_custom_endpoint` and `observability` resources instead |
| `stackit:authorizationCustomEndpoint` | `STACKIT_AUTHORIZATION_CUSTOM_ENDPOINT` | Custom endpoint for the Membership service |
| `stackit:cdnCustomEndpoint` | `STACKIT_CDN_CUSTOM_ENDPOINT` | Custom endpoint for the CDN service |
| `stackit:credentialsPath` | `STACKIT_CREDENTIALS_PATH` | Path of JSON from where the credentials are read. Default value is `~/.stackit/credentials.json` |
| `stackit:defaultRegion` | `STACKIT_DEFAULT_REGION` | Region will be used as the default location for regional services. Not all services require a region, some are global |
| `stackit:dnsCustomEndpoint` | `STACKIT_DNS_CUSTOM_ENDPOINT` | Custom endpoint for the DNS service |
| `stackit:enableBetaResources` | `STACKIT_ENABLE_BETA_RESOURCES` | Enable beta resources. Default is false |
| `stackit:experiments` | `STACKIT_EXPERIMENTS` | Enables experiments. These are unstable features without official support. Available Experiments: [iam] |
| `stackit:gitCustomEndpoint` | `STACKIT_GIT_CUSTOM_ENDPOINT` | Custom endpoint for the Git service |
| `stackit:iaasCustomEndpoint` | `STACKIT_IAAS_CUSTOM_ENDPOINT` | Custom endpoint for the IaaS service |
| `stackit:loadbalancerCustomEndpoint` | `STACKIT_LOADBALANCER_CUSTOM_ENDPOINT` | Custom endpoint for the Load Balancer service |
| `stackit:logmeCustomEndpoint` | `STACKIT_LOGME_CUSTOM_ENDPOINT` | Custom endpoint for the LogMe service |
| `stackit:mariadbCustomEndpoint` | `STACKIT_MARIADB_CUSTOM_ENDPOINT` | Custom endpoint for the MariaDB service |
| `stackit:modelservingCustomEndpoint` | `STACKIT_MODELSERVING_CUSTOM_ENDPOINT` | Custom endpoint for the AI Model Serving service |
| `stackit:mongodbflexCustomEndpoint` | `STACKIT_MONGODBFLEX_CUSTOM_ENDPOINT` | Custom endpoint for the MongoDB Flex service |
| `stackit:objectstorageCustomEndpoint` | `STACKIT_OBJECTSTORAGE_CUSTOM_ENDPOINT` | Custom endpoint for the Object Storage service |
| `stackit:observabilityCustomEndpoint` | `STACKIT_OBSERVABILITY_CUSTOM_ENDPOINT` | Custom endpoint for the Observability service |
| `stackit:opensearchCustomEndpoint` | `STACKIT_OPENSEARCH_CUSTOM_ENDPOINT` | Custom endpoint for the OpenSearch service |
| `stackit:postgresflexCustomEndpoint` | `STACKIT_POSTGRESFLEX_CUSTOM_ENDPOINT` | Custom endpoint for the PostgresFlex service |
| `stackit:privateKey` | `STACKIT_PRIVATE_KEY` | Private RSA key used for authentication, relevant for the key flow. It takes precedence over the private key that is included in the service account key |
| `stackit:privateKeyPath` | `STACKIT_PRIVATE_KEY_PATH` | Path for the private RSA key used for authentication, relevant for the key flow. It takes precedence over the private key that is included in the service account key |
| `stackit:rabbitmqCustomEndpoint` | `STACKIT_RABBITMQ_CUSTOM_ENDPOINT` | Custom endpoint for the RabbitMQ service |
| `stackit:redisCustomEndpoint` | `STACKIT_REDIS_CUSTOM_ENDPOINT` | Custom endpoint for the Redis service |
| `stackit:region` | `STACKIT_REGION` | Region will be used as the default location for regional services. Not all services require a region, some are global ⚠️ **Deprecated**: This attribute is deprecated. Use 'default_region' instead |
| `stackit:resourcemanagerCustomEndpoint` | `STACKIT_RESOURCEMANAGER_CUSTOM_ENDPOINT` | Custom endpoint for the Resource Manager service |
| `stackit:secretsmanagerCustomEndpoint` | `STACKIT_SECRETSMANAGER_CUSTOM_ENDPOINT` | Custom endpoint for the Secrets Manager service |
| `stackit:serverBackupCustomEndpoint` | `STACKIT_SERVER_BACKUP_CUSTOM_ENDPOINT` | Custom endpoint for the Server Backup service |
| `stackit:serverUpdateCustomEndpoint` | `STACKIT_SERVER_UPDATE_CUSTOM_ENDPOINT` | Custom endpoint for the Server Update service |
| `stackit:serviceAccountCustomEndpoint` | `STACKIT_SERVICE_ACCOUNT_CUSTOM_ENDPOINT` | Custom endpoint for the Service Account service |
| `stackit:serviceAccountEmail` | `STACKIT_SERVICE_ACCOUNT_EMAIL` | Service account email. It is required if you want to use the resource manager project resource ⚠️ **Deprecated**: The `service_account_email` field has been deprecated because it is not required. Will be removed after June 12th 2025 |
| `stackit:serviceAccountKey` | `STACKIT_SERVICE_ACCOUNT_KEY` | Service account key used for authentication. If set, the key flow will be used to authenticate all operations |
| `stackit:serviceAccountKeyPath` | `STACKIT_SERVICE_ACCOUNT_KEY_PATH` | Path for the service account key used for authentication. If set, the key flow will be used to authenticate all operations |
| `stackit:serviceAccountToken` | `STACKIT_SERVICE_ACCOUNT_TOKEN` | Token used for authentication. If set, the token flow will be used to authenticate all operations |
| `stackit:serviceEnablementCustomEndpoint` | `STACKIT_SERVICE_ENABLEMENT_CUSTOM_ENDPOINT` | Custom endpoint for the Service Enablement API |
| `stackit:skeCustomEndpoint` | `STACKIT_SKE_CUSTOM_ENDPOINT` | Custom endpoint for the Kubernetes Engine (SKE) service |
| `stackit:sqlserverflexCustomEndpoint` | `STACKIT_SQLSERVERFLEX_CUSTOM_ENDPOINT` | Custom endpoint for the SQL Server Flex service |
| `stackit:tokenCustomEndpoint` | `STACKIT_TOKEN_CUSTOM_ENDPOINT` | Custom endpoint for the token API, which is used to request access tokens when using the key flow |

## Reference

For detailed reference documentation, please visit [the Pulumi registry](https://www.pulumi.com/registry/packages/stackit/api-docs/).
