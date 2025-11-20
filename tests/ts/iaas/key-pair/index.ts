import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const keyPairPublicKey = "public-key";
export const keyPairName = "example-keyPair-name";
export const keyPairLabelKey = "unit-test";
export const keyPairLabelValue = "test-label-value";

// only optional field is labels
export const exampleKeyPair = new stackit.KeyPair("example_keyPair", {
    name: keyPairName,
    publicKey: keyPairPublicKey,
    labels: {[keyPairLabelKey]:keyPairLabelValue},
});

export const keyPairDatasource = stackit.getKeyPairOutput({
    name: keyPairName,
});
