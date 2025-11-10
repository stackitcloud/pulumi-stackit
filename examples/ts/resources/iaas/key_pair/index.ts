import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";
import * as std from "@pulumi/std";

// Create a key pair
const keypair = new stackit.KeyPair("keypair", {
    name: "example-key-pair-name",
    publicKey: std.chompOutput({
        input: std.fileOutput({
            input: "path/to/id_rsa.pub",            // Replace with your public key
        }).apply(invoke => invoke.result),
    }).apply(invoke => invoke.result),
});
