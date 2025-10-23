import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

// To identify the project, you need to provider either projectId or containerId. If you provide both, projectId will be used.
export const example = stackit.getResourcemanagerProjectOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual container id
    // containerId: "example-container-abc123",
});
