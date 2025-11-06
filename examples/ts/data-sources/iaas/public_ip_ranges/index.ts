import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";
import * as std from "@pulumi/std";

export const example = stackit.getPublicIpRangesOutput({});
// example usage: allow stackit services and customer vpn cidr to access observability apis
const vpnCidrs = [
    "X.X.X.X/32",           // Replace with your actual addresses
    "X.X.X.X/24",
];
const exampleObservabilityInstance = new stackit.ObservabilityInstance("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    name: "example-instance",
    planName: "Observability-Starter-EU01",                 // Replace with your actual plan
    acls: std.concatOutput({
        input: [
            example.cidrLists,
            vpnCidrs,
        ],
    }).apply(invoke => invoke.result),
    metricsRetentionDays: 90,
    metricsRetentionDays5mDownsampling: 90,
    metricsRetentionDays1hDownsampling: 90,
});
