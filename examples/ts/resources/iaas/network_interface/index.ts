import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.NetworkInterface("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    networkId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual network ID
    allowedAddresses: ["192.168.0.0/24"],
    securityGroupIds: ["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"], // Replace with your actual security group ID
});

export const networkInterfaceIdString = pulumi.interpolate`${example.networkInterfaceId}`;