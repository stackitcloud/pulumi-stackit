# How to run a typescript example locally

1. You need to have a [Pulumi](https://www.pulumi.com/) account
2. Install [Pulumi](https://www.pulumi.com/docs/iac/download-install/)
3. Install [pulumictl](https://github.com/pulumi/pulumictl/releases/tag/v0.0.49)
4. Create the sdks via `make generate_sdks`
5. Run `make install_nodejs_sdk`
6. Ensure that the `pulumi-resource-stackit` provider is in your GOPATH (located under pulumi-stackit/bin)
7. Move to a example folder like `getNetwork` and adjust the example e.g. modify the project id.
8. Ensure that the local `@stackitcloud/pulumi-stackit` module is installed.
    a. If you see errors mentioning that the module is not present install it via
       `npm install @stackitcloud/pulumi-stackit <path-to:sdk/nodejs/bin>`
9. Run the example via `pulumi up`
10. Remove the created resources with `pulumi down`
