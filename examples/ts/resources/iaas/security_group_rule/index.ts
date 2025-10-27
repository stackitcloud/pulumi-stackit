import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.SecurityGroupRule("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",              // Replace with your actual project ID
    securityGroupId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",        // Replace with your actual security group ID
    direction: "ingress",
    icmpParameters: {
        code: 0,
        type: 8,
    },
    protocol: {
        name: "icmp",
    },
});

export const securityGroupRuleIdString = pulumi.interpolate`${example.securityGroupRuleId}`;
