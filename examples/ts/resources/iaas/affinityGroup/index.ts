import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.AffinityGroup("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",       // Replace with your actual project ID
    name: "example-affinity-group-name",
    policy: "hard-anti-affinity",
});

export const affinityGroupIdString = pulumi.interpolate`${example.affinityGroupId}`;
