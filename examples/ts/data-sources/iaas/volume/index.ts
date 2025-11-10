import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getVolumeOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    volumeId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",       // Replace with your actual volume ID
});
