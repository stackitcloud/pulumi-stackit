import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { examplePublicIp, publicIpId, publicIpLabelKey, publicIpLabelValue, publicIpNetworkInterfaceId, publicIpProjectId } from "./index";


pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getPublicIp:getPublicIp") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== publicIpProjectId || args.inputs.publicIpId !== publicIpId) {
                throw new Error("getPublicIp call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...examplePublicIp, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("examplePublicIp", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("publicIp must have a project id", function(done) {
        pulumi.all([infra.examplePublicIp.urn, infra.examplePublicIp]).apply(([urn, examplePublicIp]) => {
            if (!examplePublicIp?.projectId) {
                done(new Error(`Missing project tag on examplePublicIp ${urn}`));
            } else {
                done();
            }
        });
    });

    it("publicIp must have a networkInterfaceId", function(done) {
        pulumi.all([infra.examplePublicIp.urn, infra.examplePublicIp]).apply(([urn, examplePublicIp]) => {
            if (!examplePublicIp?.networkInterfaceId) {
                done(new Error(`Missing a networkInterfaceId tag on examplePublicIp ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if project id was correctly set", function(done) {
        pulumi.all([infra.examplePublicIp.urn, infra.examplePublicIp.projectId]).apply(([urn, projectId]) => {
            if (projectId === publicIpProjectId) {
                done();
            } else {
                done(new Error(`Provided project id ${projectId} was not set correctly on examplePublicIp ${urn}`));
            }
        });
    });

    it("check if networkInterfaceId was correctly set", function(done) {
        pulumi.all([infra.examplePublicIp.urn, infra.examplePublicIp.networkInterfaceId]).apply(([urn, networkInterfaceId]) => {
            if (networkInterfaceId === publicIpNetworkInterfaceId) {
                done();
            } else {
                done(new Error(`Provided networkInterfaceId ${networkInterfaceId} was not set correctly on examplePublicIp ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.publicIpDatasource, infra.publicIpDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[publicIpLabelKey];
            if (actualValue === publicIpLabelValue) {
                done();
            } else {
                done(new Error(`Label '${publicIpLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${publicIpLabelValue} on datasource ${urn}`));
            }
        });
    });

});

describe("publicIpAssociate test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("publicIpAssociate must have a project id", function(done) {
        pulumi.all([infra.examplePublicIpAssociate.urn, infra.examplePublicIpAssociate]).apply(([urn, examplePublicIpAssociate]) => {
            if (!examplePublicIpAssociate?.projectId) {
                done(new Error(`Missing project tag on examplePublicIpAssociate ${urn}`));
            } else {
                done();
            }
        });
    });

    it("publicIpAssociate must have a networkInterfaceId", function(done) {
        pulumi.all([infra.examplePublicIpAssociate.urn, infra.examplePublicIpAssociate]).apply(([urn, examplePublicIpAssociate]) => {
            if (!examplePublicIpAssociate?.networkInterfaceId) {
                done(new Error(`Missing a networkInterfaceId tag on examplePublicIpAssociate ${urn}`));
            } else {
                done();
            }
        });
    });

    it("publicIpAssociate must have a publicIpId", function(done) {
        pulumi.all([infra.examplePublicIpAssociate.urn, infra.examplePublicIpAssociate]).apply(([urn, examplePublicIpAssociate]) => {
            if (!examplePublicIpAssociate?.publicIpId) {
                done(new Error(`Missing a publicIpId tag on examplePublicIpAssociate ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if project id was correctly set", function(done) {
        pulumi.all([infra.examplePublicIpAssociate.urn, infra.examplePublicIpAssociate.projectId]).apply(([urn, projectId]) => {
            if (projectId === publicIpProjectId) {
                done();
            } else {
                done(new Error(`Provided project id ${projectId} was not set correctly on examplePublicIpAssociate ${urn}`));
            }
        });
    });

    it("check if networkInterfaceId was correctly set", function(done) {
        pulumi.all([infra.examplePublicIpAssociate.urn, infra.examplePublicIpAssociate.networkInterfaceId]).apply(([urn, networkInterfaceId]) => {
            if (networkInterfaceId === publicIpNetworkInterfaceId) {
                done();
            } else {
                done(new Error(`Provided networkInterfaceId ${networkInterfaceId} was not set correctly on examplePublicIpAssociate ${urn}`));
            }
        });
    });

    it("check if publicIpId was correctly set", function(done) {
        pulumi.all([infra.examplePublicIpAssociate.urn, infra.examplePublicIpAssociate.publicIpId]).apply(([urn, publicIpId]) => {
            if (publicIpId === publicIpId) {
                done();
            } else {
                done(new Error(`Provided publicIpId ${publicIpId} was not set correctly on examplePublicIpAssociate ${urn}`));
            }
        });
    });
});


// datasource
describe("publicIp datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("publicIp must have a project id", function(done) {
        pulumi.all([infra.publicIpDatasource, infra.publicIpDatasource]).apply(([urn, publicIpDatasource]) => {
            if (!publicIpDatasource?.projectId) {
                done(new Error(`Missing projectId tag on publicIpDatasource ${urn}`));
            } else {
                done();
            }
        });
    });

    it("publicIp must have a networkInterfaceId", function(done) {
        pulumi.all([infra.publicIpDatasource, infra.publicIpDatasource]).apply(([urn, publicIpDatasource]) => {
            if (!publicIpDatasource?.networkInterfaceId) {
                done(new Error(`Missing a networkInterfaceId tag on publicIpDatasource ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if publicIpId was correctly set", function(done) {
        pulumi.all([infra.publicIpDatasource, infra.publicIpDatasource.publicIpId]).apply(([urn, publicIpId]) => {
            if (publicIpId === infra.publicIpId) {
                done();
            } else {
                done(new Error(`Provided publicIpId ${publicIpId} was not set correctly on publicIpDatasource ${urn}`));
            }
        });
    });

    it("check if project id was correctly set", function(done) {
        pulumi.all([infra.publicIpDatasource, infra.publicIpDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === publicIpProjectId) {
                done();
            } else {
                done(new Error(`Provided project id ${projectId} was not set correctly on publicIpDatasource ${urn}`));
            }
        });
    });

    it("check if networkInterfaceId was correctly set", function(done) {
        pulumi.all([infra.publicIpDatasource, infra.publicIpDatasource.networkInterfaceId]).apply(([urn, networkInterfaceId]) => {
            if (networkInterfaceId === publicIpNetworkInterfaceId) {
                done();
            } else {
                done(new Error(`Provided networkInterfaceId ${networkInterfaceId} was not set correctly on publicIpDatasource ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.publicIpDatasource, infra.publicIpDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[publicIpLabelKey];
            if (actualValue === publicIpLabelValue) {
                done();
            } else {
                done(new Error(`Label '${publicIpLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${publicIpLabelValue} on datasource ${urn}`));
            }
        });
    });
});
