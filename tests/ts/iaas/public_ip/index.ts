import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const publicIpProjectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const publicIpNetworkInterfaceId = "example-publicIp-name"
export const publicIpLabelKey = "unit-test";
export const publicIpLabelValue = "test-label-value";


// datasource
export const publicIpId = "publicIp-id-to-read";

export const examplePublicIp = new stackit.PublicIp("example_publicIp", {
    projectId: publicIpProjectId,
    networkInterfaceId: publicIpNetworkInterfaceId,
    labels: {[publicIpLabelKey]:publicIpLabelValue},
});

export const examplePublicIpAssociate = new stackit.PublicIpAssociate("example_publicIpAssociate", {
    projectId: publicIpProjectId,
    publicIpId: publicIpId,
    networkInterfaceId: publicIpNetworkInterfaceId,
});

export const publicIpDatasource = stackit.getPublicIpOutput({
    projectId: publicIpProjectId,
    publicIpId: publicIpId,
});
