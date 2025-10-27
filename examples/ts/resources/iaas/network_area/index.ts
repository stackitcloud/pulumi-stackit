import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.NetworkArea("example", {
    organizationId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",         // Replace with your actual organization ID
    name: "example-network-area",
    networkRanges: [{
        prefix: "192.168.0.0/24",
    }],
    transferNetwork: "192.168.1.0/24",
    labels: {
        key: "value",
    },
});
