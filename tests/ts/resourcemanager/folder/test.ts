import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { folderName, folderLabelKey, folderLabelValue, folderId, folderDatasource, folderContainerId, exampleFolder } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getResourcemanagerFolder:getResourcemanagerFolder") {
            // Check if the input parameters were passed correctly
            if (args.inputs.containerId !== folderId) {
                throw new Error("getFolder call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleFolder, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);


describe("exampleFolder", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("folder must have a parentContainerId", function(done) {
        pulumi.all([infra.exampleFolder.urn, infra.exampleFolder]).apply(([urn, exampleFolder]) => {
            if (!exampleFolder?.parentContainerId) {
                done(new Error(`Missing parentContainerId tag on exampleFolder ${urn}`));
            } else {
                done();
            }
        });
    });

    it("folder must have a name", function(done) {
        pulumi.all([infra.exampleFolder.urn, infra.exampleFolder]).apply(([urn, exampleFolder]) => {
            if (!exampleFolder?.name) {
                done(new Error(`Missing a name tag on exampleFolder ${urn}`));
            } else {
                done();
            }
        });
    });

    it("folder must have a ownerEmail", function(done) {
        pulumi.all([infra.exampleFolder.urn, infra.exampleFolder]).apply(([urn, exampleFolder]) => {
            if (!exampleFolder?.ownerEmail) {
                done(new Error(`Missing a ownerEmail tag on exampleFolder ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if parentContainerId was correctly set", function(done) {
        pulumi.all([infra.exampleFolder.urn, infra.exampleFolder.parentContainerId]).apply(([urn, parentContainerId]) => {
            if (parentContainerId === folderContainerId) {
                done();
            } else {
                done(new Error(`Provided parentContainerId ${parentContainerId} was not set correctly on exampleFolder ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleFolder.urn, infra.exampleFolder.name]).apply(([urn, name]) => {
            if (name === folderName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleFolder ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleFolder.urn, infra.exampleFolder.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[folderLabelKey];
            if (actualValue === folderLabelValue) {
                done();
            } else {
                done(new Error(`Label '${folderLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${folderLabelValue} on resource ${urn}`));
            }
        });
    });

});

// datasource
describe("folder datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if containerId was correctly set", function(done) {
        pulumi.all([infra.folderDatasource, infra.folderDatasource.containerId]).apply(([urn, containerId]) => {
            if (containerId === folderId) {
                done();
            } else {
                done(new Error(`Provided containerId ${containerId} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

});
