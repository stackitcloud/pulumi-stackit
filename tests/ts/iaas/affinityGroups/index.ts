import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const affinityGroupProjectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const affinityGroupName = "example-affinity-group-name";
export const affinityGroupPolicy = "hard-anti-affinity";

// Add input here which should be tested
export const exampleAffinityGroup = new stackit.AffinityGroup("example", {
    projectId: affinityGroupProjectId,
    name: affinityGroupName,
    policy: affinityGroupPolicy,
});
