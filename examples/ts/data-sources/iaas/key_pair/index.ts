import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getKeyPairOutput({
    name: "example-key-pair-name",              // Replace with your key pair name
});
