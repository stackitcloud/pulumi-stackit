import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const networkInterfaceProjectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const networkInterfaceNetworkId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1";
export const networkInterfaceSecurityGroupId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1";
export const networkInterfaceName = "example-networkInterface-name"
export const networkInterfaceLabelKey = "unit-test";
export const networkInterfaceLabelValue = "test-label-value";
export const networkInterfaceAllowedAddresses = "192.168.0.0/24";
export const networkInterfaceIpv4 = "192.168.1.123";
export const networkInterfaceSecurity = true;

// datasource
export const networkInterfaceId = "networkInterface-id-to-read";

// only required fields were set
export const exampleNetworkInterfaceOnlyRequired = new stackit.NetworkInterface("example_networkInterfaceInterface_req", {
    projectId: networkInterfaceProjectId,
    networkId: networkInterfaceNetworkId,
});

// everything is set
export const exampleNetworkInterfaceMax = new stackit.NetworkInterface("example_networkInterface_max", {
    projectId: networkInterfaceProjectId,
    networkId: networkInterfaceNetworkId,
    name: networkInterfaceName,
    allowedAddresses: [networkInterfaceAllowedAddresses],
    securityGroupIds: [networkInterfaceSecurityGroupId],
    ipv4: networkInterfaceIpv4,
    security: networkInterfaceSecurity,
    labels: {[networkInterfaceLabelKey]:networkInterfaceLabelValue},
});

export const networkInterfaceDatasource = stackit.getNetworkInterfaceOutput({
    projectId: networkInterfaceProjectId,
    networkId: networkInterfaceNetworkId,
    networkInterfaceId: networkInterfaceId,
});
