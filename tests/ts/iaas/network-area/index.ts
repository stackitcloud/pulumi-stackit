import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const networkAreaOrganizationId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const networkAreaName = "example-networkArea-name"
export const networkAreaLabelKey = "unit-test";
export const networkAreaLabelValue = "test-label-value";


// datasource
export const networkAreaId = "networkArea-id-to-read";

export const exampleNetworkArea = new stackit.NetworkArea("example_networkArea", {
    organizationId: networkAreaOrganizationId,
    name: networkAreaName,
    labels: {[networkAreaLabelKey]:networkAreaLabelValue},
});

export const networkAreaDatasource = stackit.getNetworkAreaOutput({
    organizationId: networkAreaOrganizationId,
    networkAreaId: networkAreaId,
});
