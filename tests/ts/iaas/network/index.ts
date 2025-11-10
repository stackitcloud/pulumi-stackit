import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const networkProjectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const networkName = "example-network-name"
export const networkLabelKey = "unit-test";
export const networkLabelValue = "test-label-value";
export const networkRouted = true;
export const networkIpv4PrefixLength = 24;
export const networkIpv4Nameservers = "1.1.1.1";

// datasource
export const networkId = "network-id-to-read";

// only required fields were set
export const exampleNetworkOnlyRequired = new stackit.Network("example_network_req", {
    projectId: networkProjectId,
    name: networkName,
});

// everything is set
export const exampleNetworkMax = new stackit.Network("example_network_max", {
    projectId: networkProjectId,
    name: networkName,
    routed: networkRouted,
    ipv4PrefixLength: networkIpv4PrefixLength,
    ipv4Nameservers: [networkIpv4Nameservers],
    labels: {[networkLabelKey]:networkLabelValue},
});

export const networkDatasource = stackit.getNetworkOutput({
    projectId: networkProjectId,
    networkId: networkId,
});
