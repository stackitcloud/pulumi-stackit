import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { imageProjectId, imageName, imageDiskFormat, imageLabelKey, imageLabelValue, imageConfig, imageId, exampleImageMax, imageDatasource } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getImage:getImage") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== imageProjectId || args.inputs.imageId !== imageId) {
                throw new Error("getImage call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleImageMax, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);


describe("exampleImageOnlyRequired", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("image must have a project id", function(done) {
        pulumi.all([infra.exampleImageOnlyRequired.urn, infra.exampleImageOnlyRequired]).apply(([urn, exampleImageOnlyRequired]) => {
            if (!exampleImageOnlyRequired?.projectId) {
                done(new Error(`Missing projectId tag on exampleImageOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("image must have a name", function(done) {
        pulumi.all([infra.exampleImageOnlyRequired.urn, infra.exampleImageOnlyRequired]).apply(([urn, exampleImageOnlyRequired]) => {
            if (!exampleImageOnlyRequired?.name) {
                done(new Error(`Missing a name tag on exampleImageOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("image must have a diskFormat", function(done) {
        pulumi.all([infra.exampleImageOnlyRequired.urn, infra.exampleImageOnlyRequired]).apply(([urn, exampleImageOnlyRequired]) => {
            if (!exampleImageOnlyRequired?.diskFormat) {
                done(new Error(`Missing a diskFormat tag on exampleImageOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleImageOnlyRequired.urn, infra.exampleImageOnlyRequired.projectId]).apply(([urn, projectId]) => {
            if (projectId === imageProjectId) {
                done();
            } else {
                done(new Error(`Provided policy ${projectId} was not set correctly on exampleImageOnlyRequired ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleImageOnlyRequired.urn, infra.exampleImageOnlyRequired.name]).apply(([urn, name]) => {
            if (name === imageName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleImageOnlyRequired ${urn}`));
            }
        });
    });

     it("check if diskFormat was correctly set", function(done) {
        pulumi.all([infra.exampleImageOnlyRequired.urn, infra.exampleImageOnlyRequired.diskFormat]).apply(([urn, diskFormat]) => {
            if (diskFormat === imageDiskFormat) {
                done();
            } else {
                done(new Error(`Provided name ${diskFormat} was not set correctly on exampleImageOnlyRequired ${urn}`));
            }
        });
    });
});

describe("exampleImageMax", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("image must have a project id", function(done) {
        pulumi.all([infra.exampleImageMax.urn, infra.exampleImageMax]).apply(([urn, exampleImageMax]) => {
            if (!exampleImageMax?.projectId) {
                done(new Error(`Missing projectId tag on exampleImageMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("image must have a name", function(done) {
        pulumi.all([infra.exampleImageMax.urn, infra.exampleImageMax]).apply(([urn, exampleImageMax]) => {
            if (!exampleImageMax?.name) {
                done(new Error(`Missing a name tag on exampleImageMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("image must have a diskFormat", function(done) {
        pulumi.all([infra.exampleImageMax.urn, infra.exampleImageMax]).apply(([urn, exampleImageMax]) => {
            if (!exampleImageMax?.diskFormat) {
                done(new Error(`Missing a diskFormat tag on exampleImageMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleImageMax.urn, infra.exampleImageMax.projectId]).apply(([urn, projectId]) => {
            if (projectId === imageProjectId) {
                done();
            } else {
                done(new Error(`Provided policy ${projectId} was not set correctly on exampleImageMax ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleImageMax.urn, infra.exampleImageMax.name]).apply(([urn, name]) => {
            if (name === imageName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleImageMax ${urn}`));
            }
        });
    });

     it("check if diskFormat was correctly set", function(done) {
        pulumi.all([infra.exampleImageMax.urn, infra.exampleImageMax.diskFormat]).apply(([urn, diskFormat]) => {
            if (diskFormat === imageDiskFormat) {
                done();
            } else {
                done(new Error(`Provided name ${diskFormat} was not set correctly on exampleImageMax ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleImageMax.urn, infra.exampleImageMax.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[imageLabelKey] : undefined;
            if (actualValue === imageLabelValue) {
                done();
            } else {
                done(new Error(`Label '${imageLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${imageLabelValue} on resource ${urn}`));
            }
        });
    });

    it("check if the entire 'config' object matches expected values", function(done) {
        pulumi.all([infra.exampleImageMax.urn, infra.exampleImageMax.config]).apply(([urn, config]) => {
            if (!config) {
                return done(new Error(`Config object is missing on resource ${urn}`));
            }
            // check provided config
            if (config.bootMenu !== imageConfig.bootMenu) return done(new Error(`bootMenu not correct: ${config.bootMenu}`));
            if (config.cdromBus !== imageConfig.cdromBus) return done(new Error(`cdromBus not correct: ${config.cdromBus}`));
            if (config.diskBus !== imageConfig.diskBus) return done(new Error(`diskBus not correct: ${config.diskBus}`));
            if (config.nicModel !== imageConfig.nicModel) return done(new Error(`nicModel not correct: ${config.nicModel}`));
            if (config.operatingSystem !== imageConfig.operatingSystem) return done(new Error(`operatingSystem not correct: ${config.operatingSystem}`));
            if (config.operatingSystemDistro !== imageConfig.operatingSystemDistro) return done(new Error(`operatingSystemDistro not correct: ${config.operatingSystemDistro}`));
            if (config.operatingSystemVersion !== imageConfig.operatingSystemVersion) return done(new Error(`operatingSystemVersion not correct: ${config.operatingSystemVersion}`));
            if (config.rescueBus !== imageConfig.rescueBus) return done(new Error(`rescueBus not correct: ${config.rescueBus}`));
            if (config.rescueDevice !== imageConfig.rescueDevice) return done(new Error(`rescueDevice not correct: ${config.rescueDevice}`));
            if (config.secureBoot !== imageConfig.secureBoot) return done(new Error(`secureBoot not correct: ${config.secureBoot}`));
            if (config.uefi !== imageConfig.uefi) return done(new Error(`uefi not correct: ${config.uefi}`));
            if (config.videoModel !== imageConfig.videoModel) return done(new Error(`videoModel not correct: ${config.videoModel}`));
            if (config.virtioScsi !== imageConfig.virtioScsi) return done(new Error(`virtioScsi not correct: ${config.virtioScsi}`));
            
            done();
        });
    });
});   

// datasource
describe("Datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.imageDatasource, infra.imageDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === imageProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if imageId was correctly set", function(done) {
        pulumi.all([infra.imageDatasource, infra.imageDatasource.imageId]).apply(([urn, imageId]) => {
            if (imageId === infra.imageId) {
                done();
            } else {
                done(new Error(`Provided imageId ${imageId} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.imageDatasource, infra.imageDatasource.name]).apply(([urn, name]) => {
            if (name === imageName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

     it("check if diskFormat was correctly set", function(done) {
        pulumi.all([infra.imageDatasource, infra.imageDatasource.diskFormat]).apply(([urn, diskFormat]) => {
            if (diskFormat === imageDiskFormat) {
                done();
            } else {
                done(new Error(`Provided name ${diskFormat} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.imageDatasource, infra.imageDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[imageLabelKey] : undefined;
            if (actualValue === imageLabelValue) {
                done();
            } else {
                done(new Error(`Label '${imageLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${imageLabelValue} on datasource ${urn.name}`));
            }
        });
    });

    it("check if the entire 'config' object matches expected values", function(done) {
        pulumi.all([infra.imageDatasource, infra.imageDatasource.config]).apply(([urn, config]) => {
            if (!config) {
                return done(new Error(`Config object is missing on datasource ${urn.name}`));
            }
            // check provided config
            if (config.bootMenu !== imageConfig.bootMenu) return done(new Error(`bootMenu not correct: ${config.bootMenu}`));
            if (config.cdromBus !== imageConfig.cdromBus) return done(new Error(`cdromBus not correct: ${config.cdromBus}`));
            if (config.diskBus !== imageConfig.diskBus) return done(new Error(`diskBus not correct: ${config.diskBus}`));
            if (config.nicModel !== imageConfig.nicModel) return done(new Error(`nicModel not correct: ${config.nicModel}`));
            if (config.operatingSystem !== imageConfig.operatingSystem) return done(new Error(`operatingSystem not correct: ${config.operatingSystem}`));
            if (config.operatingSystemDistro !== imageConfig.operatingSystemDistro) return done(new Error(`operatingSystemDistro not correct: ${config.operatingSystemDistro}`));
            if (config.operatingSystemVersion !== imageConfig.operatingSystemVersion) return done(new Error(`operatingSystemVersion not correct: ${config.operatingSystemVersion}`));
            if (config.rescueBus !== imageConfig.rescueBus) return done(new Error(`rescueBus not correct: ${config.rescueBus}`));
            if (config.rescueDevice !== imageConfig.rescueDevice) return done(new Error(`rescueDevice not correct: ${config.rescueDevice}`));
            if (config.secureBoot !== imageConfig.secureBoot) return done(new Error(`secureBoot not correct: ${config.secureBoot}`));
            if (config.uefi !== imageConfig.uefi) return done(new Error(`uefi not correct: ${config.uefi}`));
            if (config.videoModel !== imageConfig.videoModel) return done(new Error(`videoModel not correct: ${config.videoModel}`));
            if (config.virtioScsi !== imageConfig.virtioScsi) return done(new Error(`virtioScsi not correct: ${config.virtioScsi}`));
            
            done();
        });
    });
    
});
