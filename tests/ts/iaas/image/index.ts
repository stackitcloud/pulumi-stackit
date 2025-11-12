import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";
import { ImageConfig } from "@stackitcloud/pulumi-stackit/types/input";

export const imageProjectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const imageName = "example-image-name";
export const imageDiskFormat = "qcow2";
export const imageLocalFilePath = "./path/to/image.qcow2";
export const imageMinDiskSize = 10;
export const imageMinRam = 5;

export const imageLabelKey = "unit-test";
export const imageLabelValue = "test-label-value";

// datasource
export const imageId = "image-id-to-read";

export const imageConfig: ImageConfig = {
    bootMenu: false,
    cdromBus: "scsi",
    diskBus: "scsi",
    nicModel: "e1000",
    operatingSystem: "linux",
    operatingSystemDistro: "ubuntu",
    operatingSystemVersion: "22.04",
    rescueBus: "sata",
    rescueDevice: "cdrom",
    secureBoot: true,
    uefi: true,
    videoModel: "vga",
    virtioScsi: true,
};

// only required fields were set
export const exampleImageOnlyRequired = new stackit.Image("example_image_req", {
    projectId: imageProjectId,
    name: imageName,
    diskFormat: imageDiskFormat,
    localFilePath: imageLocalFilePath,
});

// everything is set
export const exampleImageMax = new stackit.Image("example_image_max", {
    projectId: imageProjectId,
    name: imageName,
    diskFormat: imageDiskFormat,
    localFilePath: imageLocalFilePath,
    minDiskSize: imageMinDiskSize,
    minRam: imageMinRam,
    labels: {[imageLabelKey]:imageLabelValue},
    config: imageConfig,
});

export const imageDatasource = stackit.getImageOutput({
    projectId: imageProjectId,
    imageId: imageId,
});
