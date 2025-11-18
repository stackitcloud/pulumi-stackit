import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const projectParentContainerId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const projectName = "example-project-name";
export const projectOwnerEmail = "john.doe@stackit.cloud";

export const projectLabelKey = "unit-test";
export const projectLabelValue = "test-label-value";

// datasource
export const projectId = "project-id-to-read";

export const exampleProjectOnlyRequired = new stackit.ResourcemanagerProject("example_project_req", {
    parentContainerId: projectParentContainerId,
    name: projectName,
    labels: {[projectLabelKey]:projectLabelValue},
    ownerEmail: projectOwnerEmail,
});

// datasource
export const projectDatasource = stackit.getResourcemanagerProjectOutput({
    projectId: projectId,
});
