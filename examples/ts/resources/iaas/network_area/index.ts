import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.NetworkArea("example", {
    organizationId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",         // Replace with your actual organization ID
    name: "example-network-area",
    labels: {
        key: "value",
    },
});

export const networkAreaIdString = pulumi.interpolate`${example.networkAreaId}`;
