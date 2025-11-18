import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";


export const volumeProjectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const volumeName = "example-volume-name";
export const volumeDescription = "volume-description";
export const volumeAvailabilityZone = "eu01-1";
export const volumeSize = 32;
export const volumePerformanceClass = "storage_premium_perf0";
export const volumeLabelKey = "unit-test";
export const volumeLabelValue = "test-label-value";

// datasource
export const volumeId = "volume-id-to-read";

// only required fields were set
export const exampleVolumeOnlyRequired = new stackit.Volume("example_volume_req", {
    projectId: volumeProjectId,
    availabilityZone: volumeAvailabilityZone,
});

// everything is set
export const exampleVolumeMax = new stackit.Volume("example_volume_max", {
    projectId: volumeProjectId,
    availabilityZone: volumeAvailabilityZone,
    name: volumeName,
    description: volumeDescription,
    labels: {[volumeLabelKey]:volumeLabelValue},
    performanceClass: volumePerformanceClass,
    size: volumeSize,
});

// datasource
export const volumeDatasource = stackit.getVolumeOutput({
    projectId: volumeProjectId,
    volumeId: volumeId,
});
