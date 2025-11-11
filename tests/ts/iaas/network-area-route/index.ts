import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const networkAreaRouteOrganizationId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const networkAreaId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1";
export const networkAreaRouteLabelKey = "unit-test";
export const networkAreaRouteLabelValue = "test-label-value";
export const networkAreaRoutePrefix = "192.168.0.0/24";
export const networkAreaRouteNextHop = "192.168.1.0/24";

// datasource
export const networkAreaRouteId = "networkAreaRoute-id-to-read";

export const exampleNetworkAreaRoute = new stackit.NetworkAreaRoute("example_networkAreaRoute", {
    organizationId: networkAreaRouteOrganizationId,
    networkAreaId: networkAreaId,
    prefix: networkAreaRoutePrefix,
    nextHop: networkAreaRouteNextHop,
    labels: {[networkAreaRouteLabelKey]:networkAreaRouteLabelValue},
});

export const networkAreaRouteDatasource = stackit.getNetworkAreaRouteOutput({
    organizationId: networkAreaRouteOrganizationId,
    networkAreaRouteId: networkAreaRouteId,
    networkAreaId: networkAreaId,
});
