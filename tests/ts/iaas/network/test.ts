import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { exampleNetworkMax, networkId, networkIpv4Nameservers, networkIpv4PrefixLength, networkLabelKey, networkLabelValue, networkName, networkProjectId, networkRouted } from "./index";


pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getNetwork:getNetwork") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== networkProjectId || args.inputs.networkId !== networkId) {
                throw new Error("getNetwork call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleNetworkMax, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("exampleNetworkOnlyRequired", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("network must have a project id", function(done) {
        pulumi.all([infra.exampleNetworkOnlyRequired.urn, infra.exampleNetworkOnlyRequired]).apply(([urn, exampleNetworkOnlyRequired]) => {
            if (!exampleNetworkOnlyRequired?.projectId) {
                done(new Error(`Missing projectId tag on exampleNetworkOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("network must have a name", function(done) {
        pulumi.all([infra.exampleNetworkOnlyRequired.urn, infra.exampleNetworkOnlyRequired]).apply(([urn, exampleNetworkOnlyRequired]) => {
            if (!exampleNetworkOnlyRequired?.name) {
                done(new Error(`Missing a name tag on exampleNetworkOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkOnlyRequired.urn, infra.exampleNetworkOnlyRequired.projectId]).apply(([urn, projectId]) => {
            if (projectId === networkProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on exampleNetworkOnlyRequired ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkOnlyRequired.urn, infra.exampleNetworkOnlyRequired.name]).apply(([urn, name]) => {
            if (name === networkName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleNetworkOnlyRequired ${urn}`));
            }
        });
    });

});

describe("exampleNetworkMax", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("network must have a project id", function(done) {
        pulumi.all([infra.exampleNetworkMax.urn, infra.exampleNetworkMax]).apply(([urn, exampleNetworkMax]) => {
            if (!exampleNetworkMax?.projectId) {
                done(new Error(`Missing projectId tag on exampleNetworkMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("network must have a name", function(done) {
        pulumi.all([infra.exampleNetworkMax.urn, infra.exampleNetworkMax]).apply(([urn, exampleNetworkMax]) => {
            if (!exampleNetworkMax?.name) {
                done(new Error(`Missing a name tag on exampleNetworkMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkMax.urn, infra.exampleNetworkMax.projectId]).apply(([urn, projectId]) => {
            if (projectId === networkProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on exampleNetworkMax ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkMax.urn, infra.exampleNetworkMax.name]).apply(([urn, name]) => {
            if (name === networkName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleNetworkMax ${urn}`));
            }
        });
    });

    it("check if routed was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkMax.urn, infra.exampleNetworkMax.routed]).apply(([urn, routed]) => {
            if (routed === networkRouted) {
                done();
            } else {
                done(new Error(`Provided routed ${routed} was not set correctly on exampleNetworkMax ${urn}`));
            }
        });
    });

    it("check if ipv4PrefixLength was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkMax.urn, infra.exampleNetworkMax.ipv4PrefixLength]).apply(([urn, ipv4PrefixLength]) => {
            if (ipv4PrefixLength === networkIpv4PrefixLength) {
                done();
            } else {
                done(new Error(`Provided ipv4PrefixLength ${ipv4PrefixLength} was not set correctly on exampleNetworkMax ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleNetworkMax.urn, infra.exampleNetworkMax.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[networkLabelKey] : undefined;
            if (actualValue === networkLabelValue) {
                done();
            } else {
                done(new Error(`Label '${networkLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${networkLabelValue} on resource ${urn}`));
            }
        });
    });

    it("check if 'ipv4Nameservers' contains the correct IP address array", function(done) {
        pulumi.all([infra.exampleNetworkMax.urn, infra.exampleNetworkMax.ipv4Nameservers]).apply(([urn, actualNameservers]) => {
            const actualValueString = JSON.stringify(actualNameservers);
            const expectedValueString = JSON.stringify([networkIpv4Nameservers]);
            if (actualValueString === expectedValueString) {
                done();
            } else {
                done(new Error(`IPv4 Nameservers was not set correctly. Actual: ${actualValueString}, Expected: ${expectedValueString} on resource ${urn}`
                ));
            }
        });
    });
});   

// datasource
describe("network datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.networkDatasource, infra.networkDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === networkProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on networkDatasource ${urn.name}`));
            }
        });
    });

    it("check if networkId was correctly set", function(done) {
        pulumi.all([infra.networkDatasource, infra.networkDatasource.networkId]).apply(([urn, networkId]) => {
            if (networkId === infra.networkId) {
                done();
            } else {
                done(new Error(`Provided networkId ${networkId} was not set correctly on networkDatasource ${urn.name}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.networkDatasource, infra.networkDatasource.name]).apply(([urn, name]) => {
            if (name === networkName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on networkDatasource ${urn.name}`));
            }
        });
    });

    it("check if routed was correctly set", function(done) {
        pulumi.all([infra.networkDatasource, infra.networkDatasource.routed]).apply(([urn, routed]) => {
            if (routed === networkRouted) {
                done();
            } else {
                done(new Error(`Provided routed ${routed} was not set correctly on networkDatasource ${urn.name}`));
            }
        });
    });

    it("check if ipv4PrefixLength was correctly set", function(done) {
        pulumi.all([infra.networkDatasource, infra.networkDatasource.ipv4PrefixLength]).apply(([urn, ipv4PrefixLength]) => {
            if (ipv4PrefixLength === networkIpv4PrefixLength) {
                done();
            } else {
                done(new Error(`Provided ipv4PrefixLength ${ipv4PrefixLength} was not set correctly on networkDatasource ${urn.name}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.networkDatasource, infra.networkDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[networkLabelKey] : undefined;
            if (actualValue === networkLabelValue) {
                done();
            } else {
                done(new Error(`Label '${networkLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${networkLabelValue} on datasource ${urn.name}`));
            }
        });
    });

    it("check if 'ipv4Nameservers' contains the correct IP address array", function(done) {
        pulumi.all([infra.networkDatasource, infra.networkDatasource.ipv4Nameservers]).apply(([urn, actualNameservers]) => {
            const actualValueString = JSON.stringify(actualNameservers);
            const expectedValueString = JSON.stringify([networkIpv4Nameservers]);
            if (actualValueString === expectedValueString) {
                done();
            } else {
                done(new Error(`IPv4 Nameservers was not set correctly. Actual: ${actualValueString}, Expected: ${expectedValueString} on datasource ${urn.name}`
                ));
            }
        });
    });
});
