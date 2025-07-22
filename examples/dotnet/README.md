# How to run a dotnet example locally

1. You need to have a [Pulumi](https://www.pulumi.com/) account
2. Install [Pulumi](https://www.pulumi.com/docs/iac/download-install/)
3. Install [pulumictl](https://github.com/pulumi/pulumictl/releases/tag/v0.0.49)
4. Create the sdks via `make generate_sdks`
5. Run `make install_dotnet_sdk` in order to create a local `nuget` folder and move all `*.nupkg` into this folder.
   In this step the `Pulumi.Stackit.nupkg` is installed which is needed in order to run the examples.
6. Add this local nuget repository to your nuget source list if not already present.
    a. Check existing nuget sources via `dotnet nuget list source`
    b. If there is no local nuget repository present you can add it to the list via 
       `dotnet nuget add source <PATH-TO-NUGET-FOLDER>`
7. Move to a example folder like `getNetwork` and add the package via `dotnet add package Pulumi.Stackit --prerelease`
8. Adjust the example e.g. modifiy the project id
9. Run the example via `pulumi up`
10. Remove the created resources with `pulumi down`
