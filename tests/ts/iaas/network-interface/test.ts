import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { exampleNetworkInterfaceMax, networkInterfaceAllowedAddresses, networkInterfaceId, networkInterfaceIpv4, networkInterfaceLabelKey, networkInterfaceLabelValue, networkInterfaceName, networkInterfaceNetworkId, networkInterfaceProjectId, networkInterfaceSecurity, networkInterfaceSecurityGroupId } from "./index";


pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getNetworkInterface:getNetworkInterface") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== networkInterfaceProjectId || args.inputs.networkId !== networkInterfaceNetworkId || args.inputs.networkInterfaceId !== networkInterfaceId) {
                throw new Error("getNetworkInterface call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleNetworkInterfaceMax, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("exampleNetworkInterfaceOnlyRequired", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("networkInterface must have a project id", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceOnlyRequired.urn, infra.exampleNetworkInterfaceOnlyRequired]).apply(([urn, exampleNetworkInterfaceOnlyRequired]) => {
            if (!exampleNetworkInterfaceOnlyRequired?.projectId) {
                done(new Error(`Missing projectId tag on exampleNetworkInterfaceOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("networkInterface must have a network id", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceOnlyRequired.urn, infra.exampleNetworkInterfaceOnlyRequired]).apply(([urn, exampleNetworkInterfaceOnlyRequired]) => {
            if (!exampleNetworkInterfaceOnlyRequired?.networkId) {
                done(new Error(`Missing networkId tag on exampleNetworkInterfaceOnlyRequired ${urn}`));
            } else {
                done();
            }
         });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceOnlyRequired.urn, infra.exampleNetworkInterfaceOnlyRequired.projectId]).apply(([urn, projectId]) => {
            if (projectId === networkInterfaceProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on exampleNetworkInterfaceOnlyRequired ${urn}`));
            }
        });
    });

    it("check if networkId was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceOnlyRequired.urn, infra.exampleNetworkInterfaceOnlyRequired.networkId]).apply(([urn, networkId]) => {
            if (networkId === networkInterfaceNetworkId) {
                done();
            } else {
                done(new Error(`Provided network ${networkId} was not set correctly on exampleNetworkInterfaceOnlyRequired ${urn}`));
            }
        });
    });

});

describe("exampleNetworkInterfaceMax", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("networkInterface must have a project id", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax]).apply(([urn, exampleNetworkInterfaceMax]) => {
            if (!exampleNetworkInterfaceMax?.projectId) {
                done(new Error(`Missing projectId tag on exampleNetworkInterfaceMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("networkInterface must have a network id", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax]).apply(([urn, exampleNetworkInterfaceMax]) => {
            if (!exampleNetworkInterfaceMax?.networkId) {
                done(new Error(`Missing networkId tag on exampleNetworkInterfaceMax ${urn}`));
            } else {
                done();
            }
         });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax.projectId]).apply(([urn, projectId]) => {
            if (projectId === networkInterfaceProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on exampleNetworkInterfaceMax ${urn}`));
            }
        });
    });

    it("check if networkId was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax.networkId]).apply(([urn, networkId]) => {
            if (networkId === networkInterfaceNetworkId) {
                done();
            } else {
                done(new Error(`Provided network ${networkId} was not set correctly on exampleNetworkInterfaceMax ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax.name]).apply(([urn, name]) => {
            if (name === networkInterfaceName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleNetworkInterfaceMax ${urn}`));
            }
        });
    });

    it("check if ipv4 was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax.ipv4]).apply(([urn, ipv4]) => {
            if (ipv4 === networkInterfaceIpv4) {
                done();
            } else {
                done(new Error(`Provided ipv4 ${ipv4} was not set correctly on exampleNetworkInterfaceMax ${urn}`));
            }
        });
    });

    it("check if security was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax.security]).apply(([urn, security]) => {
            if (security === networkInterfaceSecurity) {
                done();
            } else {
                done(new Error(`Provided security ${security} was not set correctly on exampleNetworkInterfaceMax ${urn}`));
            }
        });
    });

    it("check if allowed addresses was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax.allowedAddresses]).apply(([urn, allowedAddresses]) => {
            const expectedValue = networkInterfaceAllowedAddresses;
            if (allowedAddresses && allowedAddresses.length > 0 && allowedAddresses[0] === expectedValue) {
                done();
            } else {
                done(new Error(`Provided allowed addresses ${networkInterfaceAllowedAddresses} was not set correctly on exampleNetworkInterfaceMax ${urn}`));
            }
        });
    });

    it("check if security group ids was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax.securityGroupIds]).apply(([urn, securityGroupIds]) => {
            const expectedValue = networkInterfaceSecurityGroupId;
            if (securityGroupIds && securityGroupIds.length > 0 && securityGroupIds[0] === expectedValue) {
                done();
            } else {
                done(new Error(`Provided security group ids ${networkInterfaceSecurityGroupId} was not set correctly on exampleNetworkInterfaceMax ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleNetworkInterfaceMax.urn, infra.exampleNetworkInterfaceMax.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[networkInterfaceLabelKey] : undefined;
            if (actualValue === networkInterfaceLabelValue) {
                done();
            } else {
                done(new Error(`Label '${networkInterfaceLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${networkInterfaceLabelValue} on resource ${urn}`));
            }
        });
    });

});   

// datasource
describe("networkInterface datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.networkInterfaceDatasource, infra.networkInterfaceDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === networkInterfaceProjectId) {
                done();
            } else {
                done(new Error(`Provided project id ${projectId} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.networkInterfaceDatasource, infra.networkInterfaceDatasource.name]).apply(([urn, name]) => {
            if (name === networkInterfaceName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if networkInterfaceId was correctly set", function(done) {
        pulumi.all([infra.networkInterfaceDatasource, infra.networkInterfaceDatasource.networkInterfaceId]).apply(([urn, networkInterfaceId]) => {
            if (networkInterfaceId === infra.networkInterfaceId) {
                done();
            } else {
                done(new Error(`Provided networkInterfaceId ${networkInterfaceId} was not set correctly on networkInterfaceDatasource ${urn.name}`));
            }
        });
    });

    it("check if ipv4 was correctly set", function(done) {
        pulumi.all([infra.networkInterfaceDatasource, infra.networkInterfaceDatasource.ipv4]).apply(([urn, ipv4]) => {
            if (ipv4 === networkInterfaceIpv4) {
                done();
            } else {
                done(new Error(`Provided ipv4 ${ipv4} was not set correctly on networkInterfaceDatasource ${urn}`));
            }
        });
    });

    it("check if security was correctly set", function(done) {
        pulumi.all([infra.networkInterfaceDatasource, infra.networkInterfaceDatasource.security]).apply(([urn, security]) => {
            if (security === networkInterfaceSecurity) {
                done();
            } else {
                done(new Error(`Provided security ${security} was not set correctly on networkInterfaceDatasource ${urn}`));
            }
        });
    });

    it("check if allowed addresses was correctly set", function(done) {
        pulumi.all([infra.networkInterfaceDatasource, infra.networkInterfaceDatasource.allowedAddresses]).apply(([urn, allowedAddresses]) => {
            const expectedValue = networkInterfaceAllowedAddresses;
            if (allowedAddresses && allowedAddresses.length > 0 && allowedAddresses[0] === expectedValue) {
                done();
            } else {
                done(new Error(`Provided allowed addresses ${networkInterfaceAllowedAddresses} was not set correctly on networkInterfaceDatasource ${urn}`));
            }
        });
    });

    it("check if security group ids was correctly set", function(done) {
        pulumi.all([infra.networkInterfaceDatasource, infra.networkInterfaceDatasource.securityGroupIds]).apply(([urn, securityGroupIds]) => {
            const expectedValue = networkInterfaceSecurityGroupId;
            if (securityGroupIds && securityGroupIds.length > 0 && securityGroupIds[0] === expectedValue) {
                done();
            } else {
                done(new Error(`Provided security group ids ${networkInterfaceSecurityGroupId} was not set correctly on networkInterfaceDatasource ${urn}`));
            }
        });
    });
   

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.networkInterfaceDatasource, infra.networkInterfaceDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[networkInterfaceLabelKey] : undefined;
            if (actualValue === networkInterfaceLabelValue) {
                done();
            } else {
                done(new Error(`Label '${networkInterfaceLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${networkInterfaceLabelValue} on datasource ${urn.name}`));
            }
        });
    });

});
