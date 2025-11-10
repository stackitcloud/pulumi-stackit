import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getNetworkAreaRouteOutput({
    organizationId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",         // Replace with your actual organization ID
    networkAreaId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual network area ID
    networkAreaRouteId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",     // Replace with your actual network area route ID
});
