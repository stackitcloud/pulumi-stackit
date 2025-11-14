import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { securityGroupProjectId, securityGroupName, securityGroupId, securityGroupRuleId, exampleSecurityGroupRuleMax, exampleSecurityGroupMax, securityGroupStateful, securityGroupLabelKey, securityGroupLabelValue, securityGroupDirection, securityGroupRuleEtherType, securityGroupRuleDescription, securityGroupRuleIpRange, securityGroupIcmpCode, securityGroupIcmpType, securityGroupProtocolName } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getSecurityGroup:getSecurityGroup") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== securityGroupProjectId || args.inputs.securityGroupId !== securityGroupId) {
                throw new Error("getSecurityGroup call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleSecurityGroupMax, ...args.inputs };
        }
        if (args.token === "stackit:index/getSecurityGroupRule:getSecurityGroupRule") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== securityGroupProjectId || args.inputs.securityGroupId !== securityGroupId || args.inputs.securityGroupRuleId !== securityGroupRuleId) {
                throw new Error("getSecurityGroupRule call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleSecurityGroupRuleMax, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);


describe("exampleSecurityGroupMax", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("securityGroup must have a project id", function(done) {
        pulumi.all([infra.exampleSecurityGroupMax.urn, infra.exampleSecurityGroupMax]).apply(([urn, securityGroup]) => {
            if (!securityGroup?.projectId) {
                done(new Error(`Missing projectId tag on securityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("securityGroup must have a name", function(done) {
        pulumi.all([infra.exampleSecurityGroupMax.urn, infra.exampleSecurityGroupMax]).apply(([urn, securityGroup]) => {
            if (!securityGroup?.name) {
                done(new Error(`Missing a name tag on securityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleSecurityGroupMax.urn, infra.exampleSecurityGroupMax.projectId]).apply(([urn, projectId]) => {
            if (projectId === securityGroupProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on securityGroup ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleSecurityGroupMax.urn, infra.exampleSecurityGroupMax.name]).apply(([urn, name]) => {
            if (name === securityGroupName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on securityGroup ${urn}`));
            }
        });
    });

    it("check if stateful was correctly set", function(done) {
        pulumi.all([infra.exampleSecurityGroupMax.urn, infra.exampleSecurityGroupMax.stateful]).apply(([urn, stateful]) => {
            if (stateful === securityGroupStateful) {
                done();
            } else {
                done(new Error(`Provided stateful ${stateful} was not set correctly on securityGroup ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleSecurityGroupMax.urn, infra.exampleSecurityGroupMax.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[securityGroupLabelKey];
            if (actualValue === securityGroupLabelValue) {
                done();
            } else {
                done(new Error(`Label '${securityGroupLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${securityGroupLabelValue} on resource ${urn}`));
            }
        });
    });
    
});


describe("exampleSecurityGroupRuleReq", () => {
    let infra: typeof import("./index");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("securityGroupRule must have a project id", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleReq.urn, infra.exampleSecurityGroupRuleReq]).apply(([urn, securityGroupRule]) => {
            if (!securityGroupRule?.projectId) {
                done(new Error(`Missing projectId tag on securityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("securityGroupRule must have a securityGroupId id", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleReq.urn, infra.exampleSecurityGroupRuleReq]).apply(([urn, securityGroupRule]) => {
            if (!securityGroupRule?.securityGroupId) {
                done(new Error(`Missing securityGroupId tag on securityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("securityGroupRule must have a direction id", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleReq.urn, infra.exampleSecurityGroupRuleReq]).apply(([urn, securityGroupRule]) => {
            if (!securityGroupRule?.direction) {
                done(new Error(`Missing direction tag on securityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleReq.urn, infra.exampleSecurityGroupRuleReq.projectId]).apply(([urn, projectId]) => {
            if (projectId === securityGroupProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if securityGroupId was correctly set", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleReq.urn, infra.exampleSecurityGroupRuleReq.securityGroupId]).apply(([urn, securityGroupId]) => {
            if (securityGroupId === infra.securityGroupId) {
                done();
            } else {
                done(new Error(`Provided securityGroupId ${securityGroupId} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if direction was correctly set", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleReq.urn, infra.exampleSecurityGroupRuleReq.direction]).apply(([urn, direction]) => {
            if (direction === securityGroupDirection) {
                done();
            } else {
                done(new Error(`Provided direction ${direction} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

});

describe("exampleSecurityGroupRuleMax", () => {
    let infra: typeof import("./index");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("securityGroupRule must have a project id", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleMax.urn, infra.exampleSecurityGroupRuleMax]).apply(([urn, securityGroupRule]) => {
            if (!securityGroupRule?.projectId) {
                done(new Error(`Missing projectId tag on securityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("securityGroupRule must have a securityGroupId id", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleMax.urn, infra.exampleSecurityGroupRuleMax]).apply(([urn, securityGroupRule]) => {
            if (!securityGroupRule?.securityGroupId) {
                done(new Error(`Missing securityGroupId tag on securityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("securityGroupRule must have a direction id", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleMax.urn, infra.exampleSecurityGroupRuleMax]).apply(([urn, securityGroupRule]) => {
            if (!securityGroupRule?.direction) {
                done(new Error(`Missing direction tag on securityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleMax.urn, infra.exampleSecurityGroupRuleMax.projectId]).apply(([urn, projectId]) => {
            if (projectId === securityGroupProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if securityGroupId was correctly set", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleMax.urn, infra.exampleSecurityGroupRuleMax.securityGroupId]).apply(([urn, securityGroupId]) => {
            if (securityGroupId === infra.securityGroupId) {
                done();
            } else {
                done(new Error(`Provided securityGroupId ${securityGroupId} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if direction was correctly set", function(done) {
        pulumi.all([infra.exampleSecurityGroupRuleMax.urn, infra.exampleSecurityGroupRuleMax.direction]).apply(([urn, direction]) => {
            if (direction === securityGroupDirection) {
                done();
            } else {
                done(new Error(`Provided direction ${direction} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if description was correctly set", function(done) {
        pulumi.all([exampleSecurityGroupRuleMax.urn, exampleSecurityGroupRuleMax.description]).apply(([urn, description]) => {
            if (description === securityGroupRuleDescription) {
                done();
            } else {
                done(new Error(`Provided description ${description} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if etherType was correctly set", function(done) {
        pulumi.all([exampleSecurityGroupRuleMax.urn, exampleSecurityGroupRuleMax.etherType]).apply(([urn, etherType]) => {
            if (etherType === securityGroupRuleEtherType) {
                done();
            } else {
                done(new Error(`Provided etherType ${etherType} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if ipRange was correctly set", function(done) {
        pulumi.all([exampleSecurityGroupRuleMax.urn, exampleSecurityGroupRuleMax.ipRange]).apply(([urn, ipRange]) => {
            if (ipRange === securityGroupRuleIpRange) {
                done();
            } else {
                done(new Error(`Provided ipRange ${ipRange} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if icmpParameters code was correctly set", function(done) {
        pulumi.all([exampleSecurityGroupRuleMax.urn, exampleSecurityGroupRuleMax.icmpParameters]).apply(([urn, icmpParameters]) => {
            if (icmpParameters.code === securityGroupIcmpCode) {
                done();
            } else {
                done(new Error(`Provided icmpParameters code ${icmpParameters.code} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if icmpParameters type was correctly set", function(done) {
        pulumi.all([exampleSecurityGroupRuleMax.urn, exampleSecurityGroupRuleMax.icmpParameters]).apply(([urn, icmpParameters]) => {
            if (icmpParameters.type === securityGroupIcmpType) {
                done();
            } else {
                done(new Error(`Provided icmpParameters type ${icmpParameters.type} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if protocol name was correctly set", function(done) {
        pulumi.all([exampleSecurityGroupRuleMax.urn, exampleSecurityGroupRuleMax.protocol]).apply(([urn, protocol]) => {
            if (protocol.name === securityGroupProtocolName) {
                done();
            } else {
                done(new Error(`Provided protocol name ${protocol.name} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

});


describe("securityGroupRule datasource test", () => {
    let infra: typeof import("./index");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === securityGroupProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on securityGroup ${urn}`));
            }
        });
    });

    it("check if securityGroupId was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.securityGroupId]).apply(([urn, securityGroupId]) => {
            if (securityGroupId === infra.securityGroupId) {
                done();
            } else {
                done(new Error(`Provided securityGroupId ${securityGroupId} was not set correctly on securityGroup ${urn}`));
            }
        });
    });

    it("check if securityGroupRuleId was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.securityGroupRuleId]).apply(([urn, securityGroupRuleId]) => {
            if (securityGroupRuleId === infra.securityGroupRuleId) {
                done();
            } else {
                done(new Error(`Provided securityGroupRuleId ${securityGroupRuleId} was not set correctly on securityGroup ${urn}`));
            }
        });
    });

    it("check if direction was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.direction]).apply(([urn, direction]) => {
            if (direction === securityGroupDirection) {
                done();
            } else {
                done(new Error(`Provided direction ${direction} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if description was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.description]).apply(([urn, description]) => {
            if (description === securityGroupRuleDescription) {
                done();
            } else {
                done(new Error(`Provided description ${description} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if etherType was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.etherType]).apply(([urn, etherType]) => {
            if (etherType === securityGroupRuleEtherType) {
                done();
            } else {
                done(new Error(`Provided etherType ${etherType} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if ipRange was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.ipRange]).apply(([urn, ipRange]) => {
            if (ipRange === securityGroupRuleIpRange) {
                done();
            } else {
                done(new Error(`Provided ipRange ${ipRange} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if icmpParameters code was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.icmpParameters]).apply(([urn, icmpParameters]) => {
            if (icmpParameters.code === securityGroupIcmpCode) {
                done();
            } else {
                done(new Error(`Provided icmpParameters code ${icmpParameters.code} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if icmpParameters type was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.icmpParameters]).apply(([urn, icmpParameters]) => {
            if (icmpParameters.type === securityGroupIcmpType) {
                done();
            } else {
                done(new Error(`Provided icmpParameters type ${icmpParameters.type} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

    it("check if protocol name was correctly set", function(done) {
        pulumi.all([infra.securityGroupRuleDatasource, infra.securityGroupRuleDatasource.protocol]).apply(([urn, protocol]) => {
            if (protocol.name === securityGroupProtocolName) {
                done();
            } else {
                done(new Error(`Provided protocol name ${protocol.name} was not set correctly on securityGroupRule ${urn}`));
            }
        });
    });

});


describe("securityGroup datasource test", () => {
    let infra: typeof import("./index");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.securityGroupDatasource, infra.securityGroupDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === securityGroupProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on securityGroup ${urn.name}`));
            }
        });
    });

    it("check if securityGroupId was correctly set", function(done) {
        pulumi.all([infra.securityGroupDatasource, infra.securityGroupDatasource.securityGroupId]).apply(([urn, securityGroupId]) => {
            if (securityGroupId === infra.securityGroupId) {
                done();
            } else {
                done(new Error(`Provided securityGroupId ${securityGroupId} was not set correctly on securityGroup ${urn.name}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.securityGroupDatasource, infra.securityGroupDatasource.name]).apply(([urn, name]) => {
            if (name === securityGroupName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on securityGroup ${urn.name}`));
            }
        });
    });

    it("check if stateful was correctly set", function(done) {
        pulumi.all([infra.securityGroupDatasource, infra.securityGroupDatasource.stateful]).apply(([urn, stateful]) => {
            if (stateful === securityGroupStateful) {
                done();
            } else {
                done(new Error(`Provided stateful ${stateful} was not set correctly on securityGroup ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.securityGroupDatasource, infra.securityGroupDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[securityGroupLabelKey];
            if (actualValue === securityGroupLabelValue) {
                done();
            } else {
                done(new Error(`Label '${securityGroupLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${securityGroupLabelValue} on datasource ${urn}`));
            }
        });
    });
});
