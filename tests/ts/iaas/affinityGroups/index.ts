import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const affinityGroupProjectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const affinityGroupName = "example-affinity-group-name";
export const affinityGroupPolicy = "hard-anti-affinity";

export const affinityGroupId = "affinity-group-id-to-read";

// only required fields were set
export const exampleAffinityGroup = new stackit.AffinityGroup("example", {
    projectId: affinityGroupProjectId,
    name: affinityGroupName,
    policy: affinityGroupPolicy,
});

// datasource
export const affinityGroupDatasource = stackit.getAffinityGroupOutput({
    projectId: affinityGroupProjectId,
    affinityGroupId: affinityGroupId,
});
