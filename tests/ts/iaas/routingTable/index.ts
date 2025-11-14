import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const routingTableOrganizationId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const routingTableNetworkAreaId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1";
export const routingTableId = "routingTable-id";
export const routingTableRouteId = "routingTableRoute-id";

export const routingTableRouteLabelKey = "unit-test";
export const routingTableRouteLabelValue = "test-label-value";
export const routingTableRouteDestinationType = "cidrv4";
export const routingTableRouteDestinationValue = "192.168.178.0/24";
export const routingTableRouteNextHopType = "ipv4";
export const routingTableRouteNextHopValue = "192.168.178.1";

export const exampleRoutingTable = new stackit.RoutingTable("exampleRoutingTable", {
    organizationId: routingTableOrganizationId,
    networkAreaId: routingTableNetworkAreaId,
}); 

// only labels are optional therefore one unit test
export const exampleRoutingTableRoute = new stackit.RoutingTableRoute("exampleRoutingTableRoute", {
    organizationId: routingTableOrganizationId,
    networkAreaId: routingTableNetworkAreaId,
    routingTableId: routingTableId,
    destination: {
        type: routingTableRouteDestinationType,
        value: routingTableRouteDestinationValue,
    },
    nextHop: {
        type: routingTableRouteNextHopType,
        value: routingTableRouteNextHopValue,
    },
    labels: {[routingTableRouteLabelKey]:routingTableRouteLabelValue},
}); 

// datasource
export const routingTableDatasource = stackit.getRoutingTableOutput({
    organizationId: routingTableOrganizationId,
    networkAreaId: routingTableNetworkAreaId,
    routingTableId: routingTableId,
});

export const routingTableRouteDatasource = stackit.getRoutingTableRouteOutput({
    organizationId: routingTableOrganizationId,
    networkAreaId: routingTableNetworkAreaId,
    routingTableId: routingTableId,
    routeId: routingTableRouteId,
});
