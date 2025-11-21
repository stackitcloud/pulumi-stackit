# Release

## Release cycle

Upstream terraform provider: [terraform-provider-stackit](https://github.com/stackitcloud/terraform-provider-stackit)

This Pulumi provider will be updated as fast as possible to keep the delta between the Pulumi Bridge and the upstream Terraform provider small.
The release cycle of the Terraform provider is about every two weeks. Depending on the adjustments made it will take some time
to update the Pulumi provider as well. Examples needs to be added/adjusted, Unit tests and acceptance tests have to be added or adjusted accordingly.

The version of the Pulumi provider is the same as the one for the Terraform provider e.g. if the latest version of the Terraform provider is
`v0.70.0` the there will be a corresponding Pulumi version with `v0.70.0`.


## Release creation

> [!IMPORTANT]
> Consider informing / syncing with the team before creating a new release.

1. Check out latest main branch on your machine
2. Create the following git tags:
    - `VERSION="vX.X.X"; git tag "$VERSION" && git tag "provider/pkg/version/$VERSION" && git tag "provider/shim/$VERSION"`
3. Push the git tag: `git push origin --tags`
4. The [release pipeline](https://github.com/stackitcloud/pulumi-stackit/actions/workflows/release.yaml) will build the release and publish it on GitHub
5. Ensure the release was created properly using the 
    - [GitHub releases page](https://github.com/stackitcloud/pulumi-stackit/releases)
    - [Pulumi registry](https://www.pulumi.com/registry/packages)
6. Ensure the packages where properly published (e.g. to npm)
    - [npm](https://www.npmjs.com/)
