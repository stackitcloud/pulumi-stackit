import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const exampleWithName = new stackit.Network("example_with_name", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",                          // Replace with your actual project ID
    name: "example-with-name",
});
const exampleRoutedNetwork = new stackit.Network("example_routed_network", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",                          // Replace with your actual project ID
    name: "example-routed-network",
    labels: {
        key: "value",
    },
    routed: true,
});
const exampleNonRoutedNetwork = new stackit.Network("example_non_routed_network", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",                          // Replace with your actual project ID
    name: "example-non-routed-network",
    ipv4Nameservers: [
        "1.2.3.4",
        "5.6.7.8",
    ],
    ipv4Gateway: "10.1.2.3",
    ipv4Prefix: "10.1.2.0/24",
    labels: {
        key: "value",
    },
    routed: false,
});
