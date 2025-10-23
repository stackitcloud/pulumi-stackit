import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getResourcemanagerFolderOutput({
    containerId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",        // Replace with your actual container id
});
