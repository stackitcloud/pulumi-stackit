import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getAffinityGroupOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",              // Replace with your actual project ID
    affinityGroupId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",        // Replace with your actual affinity group ID
});
