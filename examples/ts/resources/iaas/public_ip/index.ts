import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.PublicIp("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",              // Replace with your actual project ID
    networkInterfaceId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",     // Replace with your actual network interface ID
    labels: {
        key: "value",
    },
});

export const publicIpIdString = pulumi.interpolate`${example.publicIpId}`;