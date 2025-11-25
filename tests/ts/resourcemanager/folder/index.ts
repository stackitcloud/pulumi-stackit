import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const folderContainerId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const folderName = "example-folder-name";
export const folderOwnerEmail = "foo.bar@stackit.cloud";

export const folderLabelKey = "unit-test";
export const folderLabelValue = "test-label-value";

// datasource
export const folderId = "folder-id-to-read";

export const exampleFolder = new stackit.ResourcemanagerFolder("example_folder", {
    parentContainerId: folderContainerId,
    name: folderName,
    labels: {[folderLabelKey]:folderLabelValue},
    ownerEmail: folderOwnerEmail,
});

export const folderDatasource = stackit.getResourcemanagerFolderOutput({
    containerId: folderId,
});
