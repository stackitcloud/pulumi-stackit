# How to run a go example locally

1. You need to have a [Pulumi](https://www.pulumi.com/) account
2. Install [Pulumi](https://www.pulumi.com/docs/iac/download-install/)
3. Install [pulumictl](https://github.com/pulumi/pulumictl/releases/tag/v0.0.49)
4. Create the sdks via `make generate_sdks`
5. Move to a example folder like `getNetwork` and adjust the example e.g. modify the project id.
6. Run the example via `pulumi up`
7. Remove the created resources with `pulumi down`