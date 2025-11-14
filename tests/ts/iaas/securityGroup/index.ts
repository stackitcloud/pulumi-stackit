import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const securityGroupProjectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
export const securityGroupId = "security-group-id";
export const securityGroupRuleId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1";

export const securityGroupName = "example-security-group-name";
export const securityGroupLabelKey = "unit-test";
export const securityGroupLabelValue = "test-label-value";
export const securityGroupProtocolName = "icmp";
export const securityGroupDirection = "ingress";
export const securityGroupStateful = false;
export const securityGroupIcmpCode = 0;
export const securityGroupIcmpType = 8;

export const securityGroupRuleDescription = "description";
export const securityGroupRuleEtherType = "IPv4";
export const securityGroupRuleIpRange = "192.168.2.0/24";

// all set
export const exampleSecurityGroupMax = new stackit.SecurityGroup("exampleSecurityGroupMax", {
    projectId: securityGroupProjectId,
    name: securityGroupName,
    labels: {[securityGroupLabelKey]:securityGroupLabelValue},
    stateful: securityGroupStateful,
});

// only required
export const exampleSecurityGroupRuleReq = new stackit.SecurityGroupRule("exampleSecurityGroupRuleReq", {
    projectId: securityGroupProjectId,
    securityGroupId: securityGroupId,
    direction: securityGroupDirection,
});

// SecurityGroupRule all set
export const exampleSecurityGroupRuleMax = new stackit.SecurityGroupRule("exampleSecurityGroupRuleMax", {
    projectId: securityGroupProjectId,
    securityGroupId: securityGroupId,
    direction: securityGroupDirection,
    description: securityGroupRuleDescription,
    etherType: securityGroupRuleEtherType,
    ipRange: securityGroupRuleIpRange,
    icmpParameters: {
        code: securityGroupIcmpCode,
        type: securityGroupIcmpType,
    },
    protocol: {
        name: securityGroupProtocolName,
    },
});

// datasource
export const securityGroupDatasource = stackit.getSecurityGroupOutput({
    projectId: securityGroupProjectId,
    securityGroupId: securityGroupId,
});

export const securityGroupRuleDatasource = stackit.getSecurityGroupRuleOutput({
    projectId: securityGroupProjectId,
    securityGroupId: securityGroupId,
    securityGroupRuleId: securityGroupRuleId,
});
