# How to run a typescript example locally

1. You need to have a [Pulumi](https://www.pulumi.com/) account
2. Install [Pulumi](https://www.pulumi.com/docs/iac/download-install/)
3. Install [pulumictl](https://github.com/pulumi/pulumictl/releases/tag/v0.0.49)
4. Create the sdks via `make generate_sdks`
5. Run `make install_nodejs_sdk`
6. Ensure that the `pulumi-resource-stackit` provider is in your GOPATH (located under pulumi-stackit/bin)
7. Use an existing example under e.g. the resources folder and adjust the example e.g. modify the project id.
8. Ensure that the local `@stackitcloud/pulumi-stackit` module is installed.
    a. If you see errors mentioning that the module is not present install it via
       `npm install @stackitcloud/pulumi-stackit <path-to:sdk/nodejs/bin>`

9. Ensure you have set up the authentication accordingly (see [Authentication](../../README.md#authentication))
    a. If you are using the `credentials.json` method you don't need to do further steps, you are all set up.
    b. Otherwise you have to use one of the other methods:
        Set the key via `pulumi config` command or via environment variable or provide it via the provider options like this:

    ```js
    const providerArgs: stackit.ProviderArgs = {
        serviceAccountKeyPath: "/path/to/your/sa_key.json",
        authorizationCustomEndpoint: "https://my-custom-endpoint.stackit.cloud"
    };
    const provider = new stackit.Provider("stackit-provider", providerArgs);

    // Then you can use it like the following:
    export const example = stackit.getAffinityGroupOutput(
        {
            projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // Replace with your actual project ID
            affinityGroupId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // Replace with your actual affinity group ID
        },
        {
            provider: provider,
        }
    );
    ```

11. Ensure that if you are using beta or experimental resources that those are enabled (see [README](../../README.md#opting-into-beta-resources))
12. Run the example via `pulumi up`
13. Remove the created resources with `pulumi down`
