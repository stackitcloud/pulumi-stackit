import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.NetworkAreaRoute("example", {
    organizationId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",         // Replace with your actual organization ID
    networkAreaId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual network area ID
    prefix: "192.168.0.0/24",
    nextHop: "192.168.0.0",
    labels: {
        key: "value",
    },
});

export const networkAreaRouteIdString = pulumi.interpolate`${example.networkAreaRouteId}`;
