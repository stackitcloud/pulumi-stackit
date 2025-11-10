import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.RoutingTableRoute("example", {
    organizationId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",     // Replace with your actual organization ID
    networkAreaId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual network area ID
    routingTableId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",     // Replace with your actual routing table ID
    destination: {
        type: "cidrv4",
        value: "192.168.178.0/24",
    },
    nextHop: {
        type: "ipv4",
        value: "192.168.178.1",
    },
    labels: {
        key: "value",
    },
});

export const routeIdString = pulumi.interpolate`${example.routeId}`;
