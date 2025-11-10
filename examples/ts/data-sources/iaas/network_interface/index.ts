import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getNetworkInterfaceOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    networkId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual network ID
    networkInterfaceId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // Replace with your actual network interface ID
});
