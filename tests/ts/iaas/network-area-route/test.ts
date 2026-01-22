import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { exampleNetworkAreaRoute, networkAreaId, networkAreaRouteId, networkAreaRouteLabelKey, networkAreaRouteLabelValue, networkAreaRouteNextHop, networkAreaRouteOrganizationId, networkAreaRouteDestination, networkAreaRouteDestinationType, networkAreaRouteNextHopType } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getNetworkAreaRoute:getNetworkAreaRoute") {
            // Check if the input parameters were passed correctly
            if (args.inputs.organizationId !== networkAreaRouteOrganizationId || args.inputs.networkAreaId !== networkAreaId || args.inputs.networkAreaRouteId !== networkAreaRouteId) {
                throw new Error("getNetworkAreaRoute call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleNetworkAreaRoute, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("exampleNetworkAreaRoute", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("networkAreaRoute must have a organization id", function(done) {
        pulumi.all([infra.exampleNetworkAreaRoute.urn, infra.exampleNetworkAreaRoute]).apply(([urn, exampleNetworkAreaRoute]) => {
            if (!exampleNetworkAreaRoute?.organizationId) {
                done(new Error(`Missing organization tag on exampleNetworkAreaRoute ${urn}`));
            } else {
                done();
            }
        });
    });

    it("networkAreaRoute must have a areaId", function(done) {
        pulumi.all([infra.exampleNetworkAreaRoute.urn, infra.exampleNetworkAreaRoute]).apply(([urn, exampleNetworkAreaRoute]) => {
            if (!exampleNetworkAreaRoute?.networkAreaId) {
                done(new Error(`Missing a areaId tag on exampleNetworkAreaRoute ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if organization id was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkAreaRoute.urn, infra.exampleNetworkAreaRoute.organizationId]).apply(([urn, organizationId]) => {
            if (organizationId === networkAreaRouteOrganizationId) {
                done();
            } else {
                done(new Error(`Provided organization id ${organizationId} was not set correctly on exampleNetworkAreaRoute ${urn}`));
            }
        });
    });

    it("check if areaId was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkAreaRoute.urn, infra.exampleNetworkAreaRoute.networkAreaId]).apply(([urn, areaId]) => {
            if (areaId === networkAreaId) {
                done();
            } else {
                done(new Error(`Provided areaId ${areaId} was not set correctly on exampleNetworkAreaRoute ${urn}`));
            }
        });
    });

    it("check if destination was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkAreaRoute.urn, infra.exampleNetworkAreaRoute.destination]).apply(([urn, destination]) => {
            const expectedType = networkAreaRouteDestinationType;
            const expectedValue = networkAreaRouteDestination;
            if (destination && destination.type?.length > 0 && destination.value?.length > 0 && destination.type === expectedType && destination.value === expectedValue)
                done();
            else {
                done(new Error(`Provided destination ${destination} was not set correctly on exampleNetworkAreaRoute ${urn}`));
            }
        });
    });

    it("check if nextHop was correctly set", function(done) {
        pulumi.all([infra.exampleNetworkAreaRoute.urn, infra.exampleNetworkAreaRoute.nextHop]).apply(([urn, nextHop]) => {
            const expectedType = networkAreaRouteNextHopType;
            const expectedValue = networkAreaRouteNextHop;
            if (nextHop && nextHop.type?.length && nextHop.value?.length && nextHop.type === expectedType && nextHop.value === expectedValue)
                done();
            else {
                done(new Error(`Provided nextHop ${nextHop} was not set correctly on exampleNetworkAreaRoute ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.networkAreaRouteDatasource, infra.networkAreaRouteDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[networkAreaRouteLabelKey] : undefined;
            if (actualValue === networkAreaRouteLabelValue) {
                done();
            } else {
                done(new Error(`Label '${networkAreaRouteLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${networkAreaRouteLabelValue} on datasource ${urn}`));
            }
        });
    });

});

// datasource
describe("networkAreaRoute datasource test", () => {
    let infra: typeof import("./index");
    
    // It's important to import the program _after_ the mocks are defined.
    before(async function() {
        infra = await import("./index");
    })

    it("networkAreaRoute must have a organization id", function(done) {
        pulumi.all([infra.networkAreaRouteDatasource, infra.networkAreaRouteDatasource]).apply(([urn, networkAreaRouteDatasource]) => {
            if (!networkAreaRouteDatasource?.organizationId) {
                done(new Error(`Missing organization tag on networkAreaRouteDatasource ${urn}`));
            } else {
                done();
            }
        });
    });

    it("networkAreaRoute must have a areaId", function(done) {
        pulumi.all([infra.networkAreaRouteDatasource, infra.networkAreaRouteDatasource]).apply(([urn, networkAreaRouteDatasource]) => {
            if (!networkAreaRouteDatasource?.networkAreaId) {
                done(new Error(`Missing a areaId tag on networkAreaRouteDatasource ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if networkAreaRouteId was correctly set", function(done) {
        pulumi.all([infra.networkAreaRouteDatasource, infra.networkAreaRouteDatasource.networkAreaRouteId]).apply(([urn, networkAreaRouteId]) => {
            if (networkAreaRouteId === infra.networkAreaRouteId) {
                done();
            } else {
                done(new Error(`Provided networkAreaRouteId ${networkAreaRouteId} was not set correctly on networkAreaRouteDatasource ${urn}`));
            }
        });
    });

    it("check if destination was correctly set", function(done) {
        pulumi.all([infra.networkAreaRouteDatasource, infra.networkAreaRouteDatasource.destination]).apply(([urn, destination]) => {
            const expectedType = networkAreaRouteDestinationType;
            const expectedValue = networkAreaRouteDestination;
            if (destination && destination.type?.length > 0 && destination.value?.length > 0 && destination.type === expectedType && destination.value === expectedValue)
                done();
            else {
                done(new Error(`Provided destination ${destination} was not set correctly on networkAreaRouteDatasource ${urn}`));
            }
        });
    });

    it("check if nextHop was correctly set", function(done) {
        pulumi.all([infra.networkAreaRouteDatasource, infra.networkAreaRouteDatasource.nextHop]).apply(([urn, nextHop]) => {
            const expectedType = networkAreaRouteNextHopType;
            const expectedValue = networkAreaRouteNextHop;
            if (nextHop && nextHop.type?.length && nextHop.value?.length && nextHop.type === expectedType && nextHop.value === expectedValue)
                done();
            else {
                done(new Error(`Provided nextHop ${nextHop} was not set correctly on networkAreaRouteDatasource ${urn}`));
            }
        });
    });
    
    it("check if organization id was correctly set", function(done) {
        pulumi.all([infra.networkAreaRouteDatasource, infra.networkAreaRouteDatasource.organizationId]).apply(([urn, organizationId]) => {
            if (organizationId === networkAreaRouteOrganizationId) {
                done();
            } else {
                done(new Error(`Provided organization id ${organizationId} was not set correctly on networkAreaRouteDatasource ${urn}`));
            }
        });
    });

    it("check if areaId was correctly set", function(done) {
        pulumi.all([infra.networkAreaRouteDatasource, infra.networkAreaRouteDatasource.networkAreaId]).apply(([urn, areaId]) => {
            if (areaId === networkAreaId) {
                done();
            } else {
                done(new Error(`Provided areaId ${areaId} was not set correctly on networkAreaRouteDatasource ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.networkAreaRouteDatasource, infra.networkAreaRouteDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels ? labels[networkAreaRouteLabelKey] : undefined;
            if (actualValue === networkAreaRouteLabelValue) {
                done();
            } else {
                done(new Error(`Label '${networkAreaRouteLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${networkAreaRouteLabelValue} on datasource ${urn}`));
            }
        });
    });
});
