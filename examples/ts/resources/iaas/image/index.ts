import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const exampleImage = new stackit.Image("example_image", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    name: "example-image",
    diskFormat: "qcow2",
    localFilePath: "./path/to/image.qcow2",                     // Replace with you local image
    minDiskSize: 10,
    minRam: 5,
});

export const imageIdString = pulumi.interpolate`${exampleImage.imageId}`;
