import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.SecurityGroup("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    name: "my_security_group",
    labels: {
        key: "value",
    },
});

export const securityGroupIdString = pulumi.interpolate`${example.securityGroupId}`;