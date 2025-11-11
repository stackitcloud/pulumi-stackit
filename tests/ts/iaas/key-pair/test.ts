import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { exampleKeyPair, keyPairLabelKey, keyPairLabelValue, keyPairName, keyPairPublicKey } from "./index";


pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getKeyPair:getKeyPair") {
            // Check if the input parameters were passed correctly
            if (args.inputs.name !== keyPairName) {
                throw new Error("getKeyPair call received incorrect input parameters.");
            }
            // Return the complete object
            return exampleKeyPair;
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("exampleKeyPair", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("keyPair must have a name", function(done) {
        pulumi.all([infra.exampleKeyPair.urn, infra.exampleKeyPair]).apply(([urn, exampleKeyPair]) => {
            if (!exampleKeyPair?.name) {
                done(new Error(`Missing name tag on exampleKeyPair ${urn}`));
            } else {
                done();
            }
        });
    });

    it("keyPair must have a public key", function(done) {
        pulumi.all([infra.exampleKeyPair.urn, infra.exampleKeyPair]).apply(([urn, exampleKeyPair]) => {
            if (!exampleKeyPair?.publicKey) {
                done(new Error(`Missing publicKey tag on exampleKeyPair ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleKeyPair.urn, infra.exampleKeyPair.name]).apply(([urn, name]) => {
            if (name === keyPairName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleKeyPair ${urn}`));
            }
        });
    });

    it("check if public key was correctly set", function(done) {
        pulumi.all([infra.exampleKeyPair.urn, infra.exampleKeyPair.publicKey]).apply(([urn, publicKey]) => {
            if (publicKey === keyPairPublicKey) {
                done();
            } else {
                done(new Error(`Provided public key ${publicKey} was not set correctly on exampleKeyPair ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleKeyPair.urn, infra.exampleKeyPair.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[keyPairLabelKey] : undefined;
            if (actualValue === keyPairLabelValue) {
                done();
            } else {
                done(new Error(`Label '${keyPairLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${keyPairLabelValue} on resource ${urn}`));
            }
        });
    });

});

// datasource
describe("keyPair datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.keyPairDatasource, infra.keyPairDatasource.name]).apply(([urn, name]) => {
            if (name === keyPairName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if public key was correctly set", function(done) {
        pulumi.all([infra.keyPairDatasource, infra.keyPairDatasource.publicKey]).apply(([urn, publicKey]) => {
            if (publicKey === keyPairPublicKey) {
                done();
            } else {
                done(new Error(`Provided public key ${publicKey} was not set correctly on keyPairDatasource ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.keyPairDatasource, infra.keyPairDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[keyPairLabelKey] : undefined;
            if (actualValue === keyPairLabelValue) {
                done();
            } else {
                done(new Error(`Label '${keyPairLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${keyPairLabelValue} on datasource ${urn.name}`));
            }
        });
    });

});
