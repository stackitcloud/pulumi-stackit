import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.ResourcemanagerProject("example", {
    parentContainerId: "example-parent-container-abc123",   // Replace with your actual container ID
    name: "example-container",
    labels: {
        "Label": "foo",
    },
    ownerEmail: "john.doe@stackit.cloud",                   // Replace with your actual email
});
