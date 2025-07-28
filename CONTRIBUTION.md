# Contribute to the STACKIT Pulumi Provider

Your contribution is welcome! Thank you for your interest in contributing to the STACKIT Pulumi Provider. We greatly value your feedback, feature requests, additions to the code, bug reports or documentation extensions.

## Table of contents

- [Developer Guide](#developer-guide)
- [Useful Make commands](#useful-make-commands)
- [Code Contributions](#code-contributions)
- [Bug Reports](#bug-reports)


## Developer Guide

Prerequisites:

- [`Pulumi`](https://www.pulumi.com/docs/iac/download-install/)
- [`pulumictl`](https://github.com/pulumi/pulumictl)
- [`Go`](https://go.dev/doc/install) 1.24+
- [`dotnet`](https://dotnet.microsoft.com/en-us/download) 9.0.x
- [`node`](https://nodejs.org/en/download) 20.x
- [`python`](https://www.python.org/downloads) 3.9

### Useful Make commands

These commands can be executed from the project root:

- `make build`: command to compile and install everything which is needed
- `make tfgen`: installs the provider plugins
- `make generate_sdks`: generates the sdks for all languages
- `make lint_provider`: lint the provider code
- `make fmt`: run code formatter

## Code Contributions

To make your contribution, follow these steps:

1. Check open or recently closed [Pull Requests](https://github.com/stackitcloud/pulumi-stackit/pulls) and [Issues](https://github.com/stackitcloud/pulumi-stackit/issues) to make sure the contribution you are making has not been already tackled by someone else.
2. Fork the repo.
3. Make your changes in a branch that is up-to-date with the original repo's `main` branch.
4. Commit your changes including a descriptive message
5. Create a pull request with your changes.
6. The pull request will be reviewed by the repo maintainers. If you need to make further changes, make additional commits to keep commit history. When the PR is merged, commits will be squashed.

## Bug Reports

If you would like to report a bug, please open a [GitHub issue](https://github.com/stackitcloud/pulumi-stackit/issues/new).

To ensure we can provide the best support to your issue, follow these guidelines:

1. Go through the existing issues to check if your issue has already been reported.
2. Make sure you are using the latest version of the STACKIT Pulumi Provider, we will not provide bug fixes for older versions. Also, latest versions may have the fix for your bug.
3. Please provide as much information as you can about your environment, e.g. your versions used, your version of the STACKIT Pulumi Provider, which operating system you are using and the corresponding version.
4. Include in your issue the steps to reproduce it, along with code snippets and/or information about your specific use case. This will make the support process much easier and efficient.