import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.Server("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",              // Replace with your actual project ID
    name: "example-server",
    bootVolume: {
        size: 64,
        sourceType: "image",
        sourceId: "59838a89-51b1-4892-b57f-b3caf598ee2f",           // Ubuntu 24.04
    },
    availabilityZone: "xxxx-x",                                     // Replace the availability zone
    machineType: "g2i.1",
    networkInterfaces: ["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"],    // Replace with your actual network interface ID
});


export const serverIdString = pulumi.interpolate`${example.serverId}`;