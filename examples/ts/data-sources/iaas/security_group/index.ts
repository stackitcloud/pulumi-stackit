import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getSecurityGroupOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    securityGroupId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",    // Replace with your actual security group ID
});
