import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const networkAreaRegionOrganizationId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const networkAreaRegionNetworkRanges = "192.168.0.0/24";
export const networkAreaRegionTransferNetwork = "192.168.1.0/24";

// datasource
export const networkAreaId = "networkArea-id-to-read";

export const exampleNetworkAreaRegion = new stackit.NetworkAreaRegion("example_networkAreaRegion", {
    organizationId: networkAreaRegionOrganizationId,
    networkAreaId: networkAreaId,
    ipv4: {
        networkRanges: [{
            prefix: networkAreaRegionNetworkRanges,
        }],
        transferNetwork: networkAreaRegionTransferNetwork,
    }
});

export const networkAreaRegionDatasource = stackit.getNetworkAreaRegionOutput({
    organizationId: networkAreaRegionOrganizationId,
    networkAreaId: networkAreaId,
});
