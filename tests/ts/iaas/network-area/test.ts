import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { exampleNetworkArea, networkAreaId, networkAreaLabelKey, networkAreaLabelValue, networkAreaName, networkAreaOrganizationId } from "./index";


pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getNetworkArea:getNetworkArea") {
            // Check if the input parameters were passed correctly
            if (args.inputs.organizationId !== networkAreaOrganizationId || args.inputs.networkAreaId !== networkAreaId) {
                throw new Error("getNetworkArea call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleNetworkArea, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("exampleNetworkArea", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("networkArea must have a organization id", function(done) {
        pulumi.all([infra.exampleNetworkArea.urn, infra.exampleNetworkArea]).apply(([urn, exampleNetworkArea]) => {
            if (!exampleNetworkArea?.organizationId) {
                done(new Error(`Missing organization tag on exampleNetworkArea ${urn}`));
            } else {
                done();
            }
        });
    });

    it("networkArea must have a name", function(done) {
        pulumi.all([infra.exampleNetworkArea.urn, infra.exampleNetworkArea]).apply(([urn, exampleNetworkArea]) => {
            if (!exampleNetworkArea?.name) {
                done(new Error(`Missing a name tag on exampleNetworkArea ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if organization id was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkArea.urn, infra.exampleNetworkArea.organizationId]).apply(([urn, organizationId]) => {
            if (organizationId === networkAreaOrganizationId) {
                done();
            } else {
                done(new Error(`Provided organization id ${organizationId} was not set correctly on exampleNetworkArea ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkArea.urn, infra.exampleNetworkArea.name]).apply(([urn, name]) => {
            if (name === networkAreaName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleNetworkArea ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleNetworkArea.urn, infra.exampleNetworkArea.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[networkAreaLabelKey] : undefined;
            if (actualValue === networkAreaLabelValue) {
                done();
            } else {
                done(new Error(`Label '${networkAreaLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${networkAreaLabelValue} on resource ${urn}`));
            }
        });
    });

});

// datasource
describe("networkArea datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("networkArea must have a organization id", function(done) {
        pulumi.all([infra.networkAreaDatasource, infra.networkAreaDatasource]).apply(([urn, networkAreaDatasource]) => {
            if (!networkAreaDatasource?.organizationId) {
                done(new Error(`Missing organization tag on networkAreaDatasource ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if networkAreaId was correctly set", function(done) {
            pulumi.all([infra.networkAreaDatasource, infra.networkAreaDatasource.networkAreaId]).apply(([urn, networkAreaId]) => {
                if (networkAreaId === infra.networkAreaId) {
                    done();
                } else {
                    done(new Error(`Provided networkAreaId ${networkAreaId} was not set correctly on networkAreaDatasource ${urn.name}`));
                }
            });
        });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.networkAreaDatasource, infra.networkAreaDatasource.name]).apply(([urn, name]) => {
            if (name === networkAreaName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.networkAreaDatasource, infra.networkAreaDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[networkAreaLabelKey] : undefined;
            if (actualValue === networkAreaLabelValue) {
                done();
            } else {
                done(new Error(`Label '${networkAreaLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${networkAreaLabelValue} on datasource ${urn.name}`));
            }
        });
    });
});
