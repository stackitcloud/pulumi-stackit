import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const serverProjectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const serverName = "example-server-name";
export const serverMachineType = "g2i.1";
export const serverAvailabilityZone = "eu01-1";
export const serverAffinityGroupId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1";
export const serverKeypairName = "keypairName";
export const serverDesiredStatus = "active";
export const serverNetworkInterface = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx2";
export const serverUserData = "#!/bin/bash";
export const serverBootVolumeSourceType = "image";
export const serverBootVolumeSourceId = "59838a89-51b1-4892-b57f-b3caf598ee2f";

export const serverLabelKey = "unit-test";
export const serverLabelValue = "test-label-value";


// datasource
export const serverId = "server-id-to-read";

// only required fields were set
export const exampleServerOnlyRequired = new stackit.Server("example_server_req", {
    projectId: serverProjectId,
    name: serverName,
    machineType: serverMachineType,
});

// everything is set
export const exampleServerMax = new stackit.Server("example_server_max", {
    projectId: serverProjectId,
    name: serverName,
    machineType: serverMachineType,
    affinityGroup: serverAffinityGroupId,
    availabilityZone: serverAvailabilityZone,
    keypairName: serverKeypairName,
    desiredStatus: serverDesiredStatus,
    networkInterfaces: [serverNetworkInterface],
    userData: serverUserData,
    bootVolume: {
        sourceId: serverBootVolumeSourceId, 
        sourceType: serverBootVolumeSourceType,
    },
    labels: {[serverLabelKey]:serverLabelValue},
});

// datasource
export const serverDatasource = stackit.getServerOutput({
    projectId: serverProjectId,
    serverId: serverId,
});
