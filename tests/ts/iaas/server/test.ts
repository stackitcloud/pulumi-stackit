import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { serverProjectId, serverName, serverLabelKey, serverLabelValue, serverId, exampleServerMax, serverDatasource, serverMachineType, serverAvailabilityZone, serverKeypairName, serverDesiredStatus, serverNetworkInterfaceId, serverUserData, serverBootVolumeSourceId, serverBootVolumeSourceType } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getServer:getServer") {
            // Check if the input parameters were passed correctly
            if (args.inputs.projectId !== serverProjectId || args.inputs.serverId !== serverId) {
                throw new Error("getServer call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleServerMax, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);


describe("exampleServerOnlyRequired", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("server must have a project id", function(done) {
        pulumi.all([infra.exampleServerOnlyRequired.urn, infra.exampleServerOnlyRequired]).apply(([urn, exampleServerOnlyRequired]) => {
            if (!exampleServerOnlyRequired?.projectId) {
                done(new Error(`Missing projectId tag on exampleServerOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("server must have a name", function(done) {
        pulumi.all([infra.exampleServerOnlyRequired.urn, infra.exampleServerOnlyRequired]).apply(([urn, exampleServerOnlyRequired]) => {
            if (!exampleServerOnlyRequired?.name) {
                done(new Error(`Missing a name tag on exampleServerOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("server must have a machineType", function(done) {
        pulumi.all([infra.exampleServerOnlyRequired.urn, infra.exampleServerOnlyRequired]).apply(([urn, exampleServerOnlyRequired]) => {
            if (!exampleServerOnlyRequired?.machineType) {
                done(new Error(`Missing a machineType tag on exampleServerOnlyRequired ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleServerOnlyRequired.urn, infra.exampleServerOnlyRequired.projectId]).apply(([urn, projectId]) => {
            if (projectId === serverProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on exampleServerOnlyRequired ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleServerOnlyRequired.urn, infra.exampleServerOnlyRequired.name]).apply(([urn, name]) => {
            if (name === serverName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleServerOnlyRequired ${urn}`));
            }
        });
    });

    it("check if machineType was correctly set", function(done) {
        pulumi.all([infra.exampleServerOnlyRequired.urn, infra.exampleServerOnlyRequired.machineType]).apply(([urn, machineType]) => {
            if (machineType === serverMachineType) {
                done();
            } else {
                done(new Error(`Provided machineType ${machineType} was not set correctly on exampleServerOnlyRequired ${urn}`));
            }
        });
    });

});

describe("exampleServerMax", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("server must have a project id", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax]).apply(([urn, exampleServerMax]) => {
            if (!exampleServerMax?.projectId) {
                done(new Error(`Missing projectId tag on exampleServerMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("server must have a name", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax]).apply(([urn, exampleServerMax]) => {
            if (!exampleServerMax?.name) {
                done(new Error(`Missing a name tag on exampleServerMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("server must have a machineType", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax]).apply(([urn, exampleServerMax]) => {
            if (!exampleServerMax?.machineType) {
                done(new Error(`Missing a machineType tag on exampleServerMax ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.projectId]).apply(([urn, projectId]) => {
            if (projectId === serverProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on exampleServerMax ${urn}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.name]).apply(([urn, name]) => {
            if (name === serverName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on exampleServerMax ${urn}`));
            }
        });
    });

    it("check if machineType was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.machineType]).apply(([urn, machineType]) => {
            if (machineType === serverMachineType) {
                done();
            } else {
                done(new Error(`Provided machineType ${machineType} was not set correctly on exampleServerMax ${urn}`));
            }
        });
    });

    it("check if affinityGroup was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.affinityGroup]).apply(([urn, affinityGroup]) => {
            if (affinityGroup === affinityGroup) {
                done();
            } else {
                done(new Error(`Provided affinityGroup ${affinityGroup} was not set correctly on exampleServerMax ${urn}`));
            }
        });
    });

    it("check if availabilityZone was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.availabilityZone]).apply(([urn, availabilityZone]) => {
            if (availabilityZone === serverAvailabilityZone) {
                done();
            } else {
                done(new Error(`Provided availabilityZone ${availabilityZone} was not set correctly on exampleServerMax ${urn}`));
            }
        });
    });

    it("check if keypairName was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.keypairName]).apply(([urn, keypairName]) => {
            if (keypairName === serverKeypairName) {
                done();
            } else {
                done(new Error(`Provided keypairName ${keypairName} was not set correctly on exampleServerMax ${urn}`));
            }
        });
    });

    it("check if desiredStatus was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.desiredStatus]).apply(([urn, desiredStatus]) => {
            if (desiredStatus === serverDesiredStatus) {
                done();
            } else {
                done(new Error(`Provided desiredStatus ${desiredStatus} was not set correctly on exampleServerMax ${urn}`));
            }
        });
    });

    it("check if networkInterfaces was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.networkInterfaces]).apply(([urn, networkInterfaces]) => {
            if (!networkInterfaces || networkInterfaces.length === 0) {
                return done(new Error(`networkInterfaces is missing on exampleServerMax ${urn}`));
            }
            const actualReference = networkInterfaces[0];
            if (actualReference === serverNetworkInterfaceId) {
                done();
            } else {
                done(new Error(`Provided networkInterfaces ${networkInterfaces} was not set correctly on exampleServerMax ${urn}`));
            }
        });
    });

    it("check if userData was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.userData]).apply(([urn, userData]) => {
            if (userData === serverUserData) {
                done();
            } else {
                done(new Error(`Provided userData ${userData} was not set correctly on exampleServerMax ${urn}`));
            }
        });
    });

    it("check if bootVolume sourceId was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.bootVolume]).apply(([urn, bootVolume]) => {
            if (!bootVolume) {
                return done(new Error(`bootVolume is missing on exampleServerMax ${urn}`));
            }
            if (bootVolume.sourceId === serverBootVolumeSourceId) {
                done();
            } else {
                done(new Error(`BootVolume sourceId '${bootVolume.sourceId}' was not set correctly. Actual: ${bootVolume.sourceId}, Expected: ${serverBootVolumeSourceId} on ${urn}`));
            }
        });
    });

    it("check if bootVolume sourceType was correctly set", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.bootVolume]).apply(([urn, bootVolume]) => {
            if (!bootVolume) {
                return done(new Error(`bootVolume is missing on exampleServerMax ${urn}`));
            }
            if (bootVolume.sourceType === serverBootVolumeSourceType) {
                done();
            } else {
                done(new Error(`BootVolume sourceType '${bootVolume.sourceType}' was not set correctly. Actual: ${bootVolume.sourceType}, Expected: ${serverBootVolumeSourceType} on ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleServerMax.urn, infra.exampleServerMax.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[serverLabelKey];
            if (actualValue === serverLabelValue) {
                done();
            } else {
                done(new Error(`Label '${serverLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${serverLabelValue} on resource ${urn}`));
            }
        });
    });
});   

// datasource
describe("server datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.serverDatasource, infra.serverDatasource.projectId]).apply(([urn, projectId]) => {
            if (projectId === serverProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if serverId was correctly set", function(done) {
        pulumi.all([infra.serverDatasource, infra.serverDatasource.serverId]).apply(([urn, serverId]) => {
            if (serverId === infra.serverId) {
                done();
            } else {
                done(new Error(`Provided serverId ${serverId} was not set correctly on datasource ${urn.name}`));
            }
        });
    });

    it("check if name was correctly set", function(done) {
        pulumi.all([infra.serverDatasource, infra.serverDatasource.name]).apply(([urn, name]) => {
            if (name === serverName) {
                done();
            } else {
                done(new Error(`Provided name ${name} was not set correctly on datasource ${urn.name}`));
            }
        });
    });    
});

// server network interface attach
describe("serverNetworkInterfaceAttach", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.serverNetworkInterfaceAttach, infra.serverNetworkInterfaceAttach.projectId]).apply(([urn, projectId]) => {
            if (projectId === serverProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on resource ${urn}`));
            }
        });
    });

    it("check if serverId was correctly set", function(done) {
        pulumi.all([infra.serverNetworkInterfaceAttach, infra.serverNetworkInterfaceAttach.serverId]).apply(([urn, serverId]) => {
            if (serverId === infra.serverId) {
                done();
            } else {
                done(new Error(`Provided serverId ${serverId} was not set correctly on resource ${urn}`));
            }
        });
    });

    it("check if networkInterfaceId was correctly set", function(done) {
        pulumi.all([infra.serverNetworkInterfaceAttach, infra.serverNetworkInterfaceAttach.networkInterfaceId]).apply(([urn, networkInterfaceId]) => {
            if (networkInterfaceId === infra.serverNetworkInterfaceId) {
                done();
            } else {
                done(new Error(`Provided networkInterfaceId ${networkInterfaceId} was not set correctly on resource ${urn}`));
            }
        });
    });
});

// server service account attach
describe("serverServiceAccountAttach", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.serverServiceAccountAttach, infra.serverServiceAccountAttach.projectId]).apply(([urn, projectId]) => {
            if (projectId === serverProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on resource ${urn}`));
            }
        });
    });

    it("check if serverId was correctly set", function(done) {
        pulumi.all([infra.serverServiceAccountAttach, infra.serverServiceAccountAttach.serverId]).apply(([urn, serverId]) => {
            if (serverId === infra.serverId) {
                done();
            } else {
                done(new Error(`Provided serverId ${serverId} was not set correctly on resource ${urn}`));
            }
        });
    });

    it("check if serviceAccountEmail was correctly set", function(done) {
        pulumi.all([infra.serverServiceAccountAttach, infra.serverServiceAccountAttach.serviceAccountEmail]).apply(([urn, serviceAccountEmail]) => {
            if (serviceAccountEmail === infra.serverAttachedServiceAccount) {
                done();
            } else {
                done(new Error(`Provided serviceAccountEmail ${serviceAccountEmail} was not set correctly on resource ${urn}`));
            }
        });
    });
});

// server service volume attach
describe("serverVolumeAttach", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("check if projectId was correctly set", function(done) {
        pulumi.all([infra.serverVolumeAttach, infra.serverVolumeAttach.projectId]).apply(([urn, projectId]) => {
            if (projectId === serverProjectId) {
                done();
            } else {
                done(new Error(`Provided projectId ${projectId} was not set correctly on resource ${urn}`));
            }
        });
    });

    it("check if serverId was correctly set", function(done) {
        pulumi.all([infra.serverVolumeAttach, infra.serverVolumeAttach.serverId]).apply(([urn, serverId]) => {
            if (serverId === infra.serverId) {
                done();
            } else {
                done(new Error(`Provided serverId ${serverId} was not set correctly on resource ${urn}`));
            }
        });
    });

    it("check if volumeId was correctly set", function(done) {
        pulumi.all([infra.serverVolumeAttach, infra.serverVolumeAttach.volumeId]).apply(([urn, volumeId]) => {
            if (volumeId === infra.serverAttachedVolumeId) {
                done();
            } else {
                done(new Error(`Provided volumeId ${volumeId} was not set correctly on resource ${urn}`));
            }
        });
    });
});
