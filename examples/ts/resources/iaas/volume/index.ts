import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.Volume("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    name: "my_volume",
    availabilityZone: "eu01-1",
    size: 64,
    labels: {
        key: "value",
    },
});

export const volumeIdString = pulumi.interpolate`${example.volumeId}`;
