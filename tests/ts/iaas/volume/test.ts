import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { volumeProjectId, volumeName, volumeLabelKey, volumeLabelValue, volumeId, exampleVolumeMax, volumeDatasource, volumeAvailabilityZone, volumeDescription, volumePerformanceClass, volumeSize } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getVolume:getVolume") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== volumeProjectId || args.inputs.volumeId !== volumeId) {
                throw new Error("getVolume call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleVolumeMax, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);


describe("exampleVolumeOnlyRequired", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("volume must have a project id", function(done) {
        pulumi.all([infra.exampleVolumeOnlyRequired.urn, infra.exampleVolumeOnlyRequired]).apply(([urn, exampleVolumeOnlyRequired]) => {
            if (!exampleVolumeOnlyRequired?.projectId) {
                done(new Error(`Missing projectId tag on exampleVolumeOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("volume must have a availabilityZone", function(done) {
        pulumi.all([infra.exampleVolumeOnlyRequired.urn, infra.exampleVolumeOnlyRequired]).apply(([urn, exampleVolumeOnlyRequired]) => {
            if (!exampleVolumeOnlyRequired?.availabilityZone) {
                done(new Error(`Missing a availabilityZone tag on exampleVolumeOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleVolumeOnlyRequired.urn, infra.exampleVolumeOnlyRequired.projectId]).apply(([urn, projectId]) => {
            if (projectId === volumeProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on exampleVolumeOnlyRequired ${urn}`));
            }
        });
    });

    it("check if availabilityZone was correctly set", function(done) {
        pulumi.all([infra.exampleVolumeOnlyRequired.urn, infra.exampleVolumeOnlyRequired.availabilityZone]).apply(([urn, availabilityZone]) => {
            if (availabilityZone === volumeAvailabilityZone) {
                done();
            } else {
                done(new Error(`Provided availabilityZone ${availabilityZone} was not set correctly on exampleVolumeOnlyRequired ${urn}`));
            }
        });
    });

});

describe("exampleVolumeMax", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("volume must have a project id", function(done) {
        pulumi.all([infra.exampleVolumeMax.urn, infra.exampleVolumeMax]).apply(([urn, exampleVolumeMax]) => {
            if (!exampleVolumeMax?.projectId) {
                done(new Error(`Missing projectId tag on exampleVolumeMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("volume must have a availabilityZone", function(done) {
        pulumi.all([infra.exampleVolumeMax.urn, infra.exampleVolumeMax]).apply(([urn, exampleVolumeMax]) => {
            if (!exampleVolumeMax?.availabilityZone) {
                done(new Error(`Missing a availabilityZone tag on exampleVolumeMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleVolumeMax.urn, infra.exampleVolumeMax.projectId]).apply(([urn, projectId]) => {
            if (projectId === volumeProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on exampleVolumeMax ${urn}`));
            }
        });
    });

    it("check if availabilityZone was correctly set", function(done) {
        pulumi.all([infra.exampleVolumeMax.urn, infra.exampleVolumeMax.availabilityZone]).apply(([urn, availabilityZone]) => {
            if (availabilityZone === volumeAvailabilityZone) {
                done();
            } else {
                done(new Error(`Provided availabilityZone ${availabilityZone} was not set correctly on exampleVolumeMax ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleVolumeMax.urn, infra.exampleVolumeMax.name]).apply(([urn, name]) => {
            if (name === volumeName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleVolumeMax ${urn}`));
            }
        });
    });

    it("check if description was correctly set", function(done) {
        pulumi.all([infra.exampleVolumeMax.urn, infra.exampleVolumeMax.description]).apply(([urn, description]) => {
            if (description === volumeDescription) {
                done();
            } else {
                done(new Error(`Provided description ${description} was not set correctly on exampleVolumeMax ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleVolumeMax.urn, infra.exampleVolumeMax.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[volumeLabelKey];
            if (actualValue === volumeLabelValue) {
                done();
            } else {
                done(new Error(`Label '${volumeLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${volumeLabelValue} on resource ${urn}`));
            }
        });
    });

    it("check if performanceClass was correctly set", function(done) {
        pulumi.all([infra.exampleVolumeMax.urn, infra.exampleVolumeMax.performanceClass]).apply(([urn, performanceClass]) => {
            if (performanceClass === volumePerformanceClass) {
                done();
            } else {
                done(new Error(`Provided performanceClass ${performanceClass} was not set correctly on exampleVolumeMax ${urn}`));
            }
        });
    });

    it("check if size was correctly set", function(done) {
        pulumi.all([infra.exampleVolumeMax.urn, infra.exampleVolumeMax.size]).apply(([urn, size]) => {
            if (size === volumeSize) {
                done();
            } else {
                done(new Error(`Provided size ${size} was not set correctly on exampleVolumeMax ${urn}`));
            }
        });
    });
   
});   

// datasource
describe("volume datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.volumeDatasource, infra.volumeDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === volumeProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if volumeId was correctly set", function(done) {
        pulumi.all([infra.volumeDatasource, infra.volumeDatasource.volumeId]).apply(([urn, volumeId]) => {
            if (volumeId === infra.volumeId) {
                done();
            } else {
                done(new Error(`Provided volumeId ${volumeId} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if availabilityZone was correctly set", function(done) {
        pulumi.all([infra.volumeDatasource, infra.volumeDatasource.availabilityZone]).apply(([urn, availabilityZone]) => {
            if (availabilityZone === volumeAvailabilityZone) {
                done();
            } else {
                done(new Error(`Provided availabilityZone ${availabilityZone} was not set correctly on datasource ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.volumeDatasource, infra.volumeDatasource.name]).apply(([urn, name]) => {
            if (name === volumeName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if description was correctly set", function(done) {
        pulumi.all([infra.volumeDatasource, infra.volumeDatasource.description]).apply(([urn, description]) => {
            if (description === volumeDescription) {
                done();
            } else {
                done(new Error(`Provided description ${description} was not set correctly on datasource ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.volumeDatasource, infra.volumeDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[volumeLabelKey];
            if (actualValue === volumeLabelValue) {
                done();
            } else {
                done(new Error(`Label '${volumeLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${volumeLabelValue} on datasource ${urn.name}`));
            }
        });
    });

    it("check if performanceClass was correctly set", function(done) {
        pulumi.all([infra.volumeDatasource, infra.volumeDatasource.performanceClass]).apply(([urn, performanceClass]) => {
            if (performanceClass === volumePerformanceClass) {
                done();
            } else {
                done(new Error(`Provided performanceClass ${performanceClass} was not set correctly on datasource ${urn}`));
            }
        });
    });

    it("check if size was correctly set", function(done) {
        pulumi.all([infra.volumeDatasource, infra.volumeDatasource.size]).apply(([urn, size]) => {
            if (size === volumeSize) {
                done();
            } else {
                done(new Error(`Provided size ${size} was not set correctly on datasource ${urn}`));
            }
        });
    });
    
});
