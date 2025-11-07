// affinitygroup.test.ts
import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { affinityGroupProjectId, affinityGroupName, affinityGroupPolicy } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
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
            if (!affinityGroup || !affinityGroup["projectId"]) {
                done(new Error(`Missing projectId tag on affinityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

    it("affinityGroup must have a name", function(done) {
        pulumi.all([infra.exampleAffinityGroup.urn, infra.exampleAffinityGroup]).apply(([urn, affinityGroup]) => {
            if (!affinityGroup || !affinityGroup["name"]) {
                done(new Error(`Missing a name tag on affinityGroup ${urn}`));
            } else {
                done();
            }
        });
    });

     it("affinityGroup must have a policy", function(done) {
        pulumi.all([infra.exampleAffinityGroup.urn, infra.exampleAffinityGroup]).apply(([urn, affinityGroup]) => {
            if (!affinityGroup || !affinityGroup["policy"]) {
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