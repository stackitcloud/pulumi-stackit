---
title: stackit
meta_desc: Learn how to use Pulumi's STACKIT provider to manage STACKIT resources.
layout: package
---

<div align="center">
<br>
<img src=".github/images/stackit-logo.svg" alt="STACKIT logo" width="50%"/>
<br>
<br>
</div>

# STACKIT Pulumi Provider (ALPHA)

[![GitHub License](https://img.shields.io/github/license/stackitcloud/pulumi-stackit)](https://www.apache.org/licenses/LICENSE-2.0)

> [!WARNING]
> This STACKIT Pulumi Provider is in an ALPHA state. Currently, only IaaS and Resource Manager services in TypeScript are supported. More functionality will be supported soon. Your feedback is appreciated! Feel free to open GitHub issues to provide feature requests and bug reports.

The STACKIT Pulumi Provider lets you manage [STACKIT](https://www.stackit.de/en/) resources.


## Reporting issues

If you encounter any issues or have suggestions for improvements, please open an issue in the repository or create a ticket in the [STACKIT Help Center](https://support.stackit.cloud/).

## License

Apache 2.0

## Installing

This package is available for several languages/platforms:

### Node.js (JavaScript/TypeScript)

To use from JavaScript or TypeScript in Node.js, install using either `npm`:

```bash
npm install @stackitcloud/pulumi-stackit
```

or `yarn`:

```bash
yarn add @stackitcloud/pulumi-stackit
```

### Python

To use from Python, install using `pip`:

```bash
pip install pulumi_stackit
```

### Go

To use from Go, use `go get` to grab the latest version of the library:

```bash
go get github.com/stackitcloud/pulumi-stackit/sdk
```

### .NET

To use from .NET, install using `dotnet add package`:

```bash
dotnet add package Pulumi.stackit
```

## Example

{{< chooser language "typescript" >}}

{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const exampleWithName = new stackit.Network("example_with_name", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",                          // Replace with your actual project ID
    name: "example-with-name",
});
```

{{% /choosable %}}
{{< /chooser >}}

For more examples, please have a look at the [Examples](./examples/).

A detailed authentication guide, information on how to use beta and experimental resources, and available configuration options can be found under [Installation Configuration](./docs/installation-configuration.md).

## Reference

For detailed reference documentation, please visit [the Pulumi registry](https://www.pulumi.com/registry/packages/stackit/api-docs/).
