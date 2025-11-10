import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getRoutingTableRouteOutput({
    organizationId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",         // Replace with your actual organization ID
    networkAreaId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual network area ID
    routingTableId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",         // Replace with your actual routing table ID
    routeId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",                // Replace with your actual route ID
});
