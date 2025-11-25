import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { projectName, projectLabelKey, projectLabelValue, projectId, projectDatasource, exampleProjectOnlyRequired, projectParentContainerId, projectOwnerEmail } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getResourcemanagerProject:getResourcemanagerProject") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== projectId) {
                throw new Error("getResourcemanagerProject call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleProjectOnlyRequired, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);


describe("exampleProjectOnlyRequired", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("project must have a parentContainerId", function(done) {
        pulumi.all([infra.exampleProjectOnlyRequired.urn, infra.exampleProjectOnlyRequired]).apply(([urn, exampleProjectOnlyRequired]) => {
            if (!exampleProjectOnlyRequired?.parentContainerId) {
                done(new Error(`Missing parentContainerId tag on exampleProjectOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("project must have a name", function(done) {
        pulumi.all([infra.exampleProjectOnlyRequired.urn, infra.exampleProjectOnlyRequired]).apply(([urn, exampleProjectOnlyRequired]) => {
            if (!exampleProjectOnlyRequired?.name) {
                done(new Error(`Missing a name tag on exampleProjectOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if parentContainerId was correctly set", function(done) {
        pulumi.all([infra.exampleProjectOnlyRequired.urn, infra.exampleProjectOnlyRequired.parentContainerId]).apply(([urn, parentContainerId]) => {
            if (parentContainerId === projectParentContainerId) {
                done();
            } else {
                done(new Error(`Provided parentContainerId ${parentContainerId} was not set correctly on exampleProjectOnlyRequired ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleProjectOnlyRequired.urn, infra.exampleProjectOnlyRequired.name]).apply(([urn, name]) => {
            if (name === projectName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleProjectOnlyRequired ${urn}`));
            }
        });
    });

    it("check if ownerEmail was correctly set", function(done) {
        pulumi.all([infra.exampleProjectOnlyRequired.urn, infra.exampleProjectOnlyRequired.ownerEmail]).apply(([urn, ownerEmail]) => {
            if (ownerEmail === projectOwnerEmail) {
                done();
            } else {
                done(new Error(`Provided ownerEmail ${ownerEmail} was not set correctly on exampleProjectOnlyRequired ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleProjectOnlyRequired.urn, infra.exampleProjectOnlyRequired.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[projectLabelKey];
            if (actualValue === projectLabelValue) {
                done();
            } else {
                done(new Error(`Label '${projectLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${projectLabelValue} on resource ${urn}`));
            }
        });
    });

});

// datasource
describe("project datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.projectDatasource, infra.projectDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === projectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.projectDatasource, infra.projectDatasource.name]).apply(([urn, name]) => {
            if (name === projectName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.projectDatasource, infra.projectDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[projectLabelKey];
            if (actualValue === projectLabelValue) {
                done();
            } else {
                done(new Error(`Label '${projectLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${projectLabelValue} on datasource ${urn.name}`));
            }
        });
    });
    
});
