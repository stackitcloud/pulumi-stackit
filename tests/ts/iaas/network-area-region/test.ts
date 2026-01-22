import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { exampleNetworkAreaRegion, networkAreaId, networkAreaRegionNetworkRanges, networkAreaRegionOrganizationId, networkAreaRegionTransferNetwork } from "./index";


pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getNetworkAreaRegion:getNetworkAreaRegion") {
            // Check if the input parameters were passed correctly
            if (args.inputs.organizationId !== networkAreaRegionOrganizationId || args.inputs.networkAreaId !== networkAreaId) {
                throw new Error("getNetworkAreaRegion call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleNetworkAreaRegion, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("exampleNetworkAreaRegion", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("networkAreaRegion must have a organization id", function(done) {
        pulumi.all([infra.exampleNetworkAreaRegion.urn, infra.exampleNetworkAreaRegion]).apply(([urn, exampleNetworkAreaRegion]) => {
            if (!exampleNetworkAreaRegion?.organizationId) {
                done(new Error(`Missing organization tag on exampleNetworkAreaRegion ${urn}`));
            } else {
                done();
            }
        });
    });

    it("networkAreaRegion must have a networkRanges", function(done) {
        pulumi.all([infra.exampleNetworkAreaRegion.urn, infra.exampleNetworkAreaRegion.ipv4]).apply(([urn, ipv4]) => {
            if (!ipv4?.networkRanges) {
                done(new Error(`Missing a networkRanges tag on exampleNetworkAreaRegion ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if organization id was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkAreaRegion.urn, infra.exampleNetworkAreaRegion.organizationId]).apply(([urn, organizationId]) => {
            if (organizationId === networkAreaRegionOrganizationId) {
                done();
            } else {
                done(new Error(`Provided organization id ${organizationId} was not set correctly on exampleNetworkAreaRegion ${urn}`));
            }
        });
    });

    it("check if network ranges was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkAreaRegion.urn, infra.exampleNetworkAreaRegion.ipv4]).apply(([urn, ipv4]) => {
            const expectedValue = networkAreaRegionNetworkRanges;
            if (ipv4.networkRanges && ipv4.networkRanges.length > 0 && ipv4.networkRanges[0].prefix === expectedValue) {
                done();
            } else {
                done(new Error(`Provided network ranges ${networkAreaRegionNetworkRanges} was not set correctly on exampleNetworkAreaRegion ${urn}`));
            }
        });
    });

    it("check if transfer network was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkAreaRegion.urn, infra.exampleNetworkAreaRegion.ipv4]).apply(([urn, ipv4]) => {
            const expectedValue = networkAreaRegionTransferNetwork;
            if (ipv4.transferNetwork && ipv4.transferNetwork.length > 0 && ipv4.transferNetwork === expectedValue) {
                done();
            } else {
                done(new Error(`Provided transfer network network ${networkAreaRegionTransferNetwork} was not set correctly on exampleNetworkAreaRegion ${urn}`));
            }
        });
    });
});

// datasource
describe("networkAreaRegion datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("networkAreaRegion must have a organization id", function(done) {
        pulumi.all([infra.networkAreaRegionDatasource, infra.networkAreaRegionDatasource]).apply(([urn, networkAreaRegionDatasource]) => {
            if (!networkAreaRegionDatasource?.organizationId) {
                done(new Error(`Missing organization tag on networkAreaDatasource ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if networkAreaId was correctly set", function(done) {
            pulumi.all([infra.networkAreaRegionDatasource, infra.networkAreaRegionDatasource.networkAreaId]).apply(([urn, networkAreaId]) => {
                if (networkAreaId === infra.networkAreaId) {
                    done();
                } else {
                    done(new Error(`Provided networkAreaId ${networkAreaId} was not set correctly on networkAreaRegionDatasource`));
                }
            });
        });


    it("check if network ranges was correctly set", function(done) {
        pulumi.all([infra.networkAreaRegionDatasource, infra.networkAreaRegionDatasource.ipv4]).apply(([urn, ipv4]) => {
            const expectedValue = networkAreaRegionNetworkRanges;
            if (ipv4.networkRanges && ipv4.networkRanges.length > 0 && ipv4.networkRanges[0].prefix === expectedValue) {
                done();
            } else {
                done(new Error(`Provided network ranges ${networkAreaRegionNetworkRanges} was not set correctly on networkAreaDatasource ${urn}`));
            }
        });
    });

    it("check if transfer network was correctly set", function(done) {
        pulumi.all([infra.networkAreaRegionDatasource, infra.networkAreaRegionDatasource.ipv4]).apply(([urn, ipv4]) => {
            const expectedValue = networkAreaRegionTransferNetwork;
            if (ipv4.transferNetwork && ipv4.transferNetwork.length > 0 && ipv4.transferNetwork === expectedValue) {
                done();
            } else {
                done(new Error(`Provided transfer network network ${networkAreaRegionTransferNetwork} was not set correctly on networkAreaRegionDatasource ${urn}`));
            }
        });
    });

});
