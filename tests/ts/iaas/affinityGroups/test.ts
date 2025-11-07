import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { affinityGroupProjectId, affinityGroupName, affinityGroupPolicy, affinityGroupId, exampleAffinityGroup } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getAffinityGroup:getAffinityGroup") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== affinityGroupProjectId || args.inputs.affinityGroupId !== affinityGroupId) {
                throw new Error("getAffinityGroup call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleAffinityGroup, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);


describe("exampleAffinityGroup", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("affinityGroup must have a project id", function(done) {
        pulumi.all([infra.exampleAffinityGroup.urn, infra.exampleAffinityGroup]).apply(([urn, affinityGroup]) => {
            if (!affinityGroup?.projectId) {
                done(new Error(`Missing projectId tag on affinityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("affinityGroup must have a name", function(done) {
        pulumi.all([infra.exampleAffinityGroup.urn, infra.exampleAffinityGroup]).apply(([urn, affinityGroup]) => {
            if (!affinityGroup?.name) {
                done(new Error(`Missing a name tag on affinityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

     it("affinityGroup must have a policy", function(done) {
        pulumi.all([infra.exampleAffinityGroup.urn, infra.exampleAffinityGroup]).apply(([urn, affinityGroup]) => {
            if (!affinityGroup?.policy) {
                done(new Error(`Missing a policy tag on affinityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleAffinityGroup.urn, infra.exampleAffinityGroup.projectId]).apply(([urn, projectId]) => {
            if (projectId === affinityGroupProjectId) {
                done();
            } else {
                done(new Error(`Provided policy ${projectId} was not set correctly on affinityGroup ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleAffinityGroup.urn, infra.exampleAffinityGroup.name]).apply(([urn, name]) => {
            if (name === affinityGroupName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on affinityGroup ${urn}`));
            }
        });
    });

    it("check if policy was correctly set", function(done) {
        pulumi.all([infra.exampleAffinityGroup.urn, infra.exampleAffinityGroup.policy]).apply(([urn, policy]) => {
            if (policy === affinityGroupPolicy) {
                done();
            } else {
                done(new Error(`Provided policy ${policy} was not set correctly on affinityGroup ${urn}`));
            }
        });
    });
});

describe("affinityGroup datasource test", () => {
    let infra: typeof import("./index");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.affinityGroupDatasource, infra.affinityGroupDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === affinityGroupProjectId) {
                done();
            } else {
                done(new Error(`Provided policy ${projectId} was not set correctly on affinityGroup ${urn.name}`));
            }
        });
    });

    it("check if affinityGroupId was correctly set", function(done) {
        pulumi.all([infra.affinityGroupDatasource, infra.affinityGroupDatasource.affinityGroupId]).apply(([urn, affinityGroupId]) => {
            if (affinityGroupId === infra.affinityGroupId) {
                done();
            } else {
                done(new Error(`Provided affinityGroupId ${affinityGroupId} was not set correctly on affinityGroup ${urn.name}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.affinityGroupDatasource, infra.affinityGroupDatasource.name]).apply(([urn, name]) => {
            if (name === affinityGroupName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on affinityGroup ${urn.name}`));
            }
        });
    });

    it("check if policy was correctly set", function(done) {
        pulumi.all([infra.affinityGroupDatasource, infra.affinityGroupDatasource.policy]).apply(([urn, policy]) => {
            if (policy === affinityGroupPolicy) {
                done();
            } else {
                done(new Error(`Provided policy ${policy} was not set correctly on affinityGroup ${urn.name}`));
            }
        });
    });
});
