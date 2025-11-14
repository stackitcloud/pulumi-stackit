import * as assert from "assert";
import * as pulumi from "@pulumi/pulumi";
import "mocha";
import { routingTableId, exampleRoutingTable, routingTableOrganizationId, routingTableRouteId, exampleRoutingTableRoute, routingTableNetworkAreaId, routingTableRouteLabelKey, routingTableRouteLabelValue, routingTableRouteDestinationType, routingTableRouteDestinationValue, routingTableRouteNextHopType, routingTableRouteNextHopValue } from "./index";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        // We check the token to identify which data source is being called.
        if (args.token === "stackit:index/getRoutingTable:getRoutingTable") {
            // Check if the input parameters were passed correctly
            if (args.inputs.organizationId !== routingTableOrganizationId || args.inputs.networkAreaId !== routingTableNetworkAreaId || args.inputs.routingTableId !== routingTableId) {
                throw new Error("getRoutingTable call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleRoutingTable, ...args.inputs };
        }
        if (args.token === "stackit:index/getRoutingTableRoute:getRoutingTableRoute") {
            // Check if the input parameters were passed correctly
            if (args.inputs.organizationId !== routingTableOrganizationId || args.inputs.networkAreaId !== routingTableNetworkAreaId || args.inputs.routingTableId !== routingTableId || args.inputs.routeId !== routingTableRouteId) {
                console.log("throw error")
                throw new Error("getRoutingTableRoute call received incorrect input parameters.");
            }
            // Return the complete object
            return { ...exampleRoutingTableRoute, ...args.inputs };
        }
        return args.inputs;
    },
},
  "project",
  "stack",
  false, // Sets the flag `dryRun`, which indicates if pulumi is running in preview mode.
);

describe("exampleRoutingTable", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("routingTable must have a organization id", function(done) {
        pulumi.all([infra.exampleRoutingTable.urn, infra.exampleRoutingTable]).apply(([urn, routingTable]) => {
            if (!routingTable?.organizationId) {
                done(new Error(`Missing organization tag on routingTable ${urn}`));
            } else {
                done();
            }
        });
    });

    it("routingTable must have a networkArea id", function(done) {
        pulumi.all([infra.exampleRoutingTable.urn, infra.exampleRoutingTable]).apply(([urn, routingTable]) => {
            if (!routingTable?.networkAreaId) {
                done(new Error(`Missing networkAreaId tag on routingTable ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if organizationId was correctly set", function(done) {
        pulumi.all([infra.exampleRoutingTable.urn, infra.exampleRoutingTable.organizationId]).apply(([urn, organizationId]) => {
            if (organizationId === routingTableOrganizationId) {
                done();
            } else {
                done(new Error(`Provided organizationId ${organizationId} was not set correctly on routingTable ${urn}`));
            }
        });
    });

    it("check if networkAreaId was correctly set", function(done) {
        pulumi.all([infra.exampleRoutingTable.urn, infra.exampleRoutingTable.networkAreaId]).apply(([urn, networkAreaId]) => {
            if (routingTableNetworkAreaId === networkAreaId) {
                done();
            } else {
                done(new Error(`Provided networkAreaId ${networkAreaId} was not set correctly on routingTable ${urn}`));
            }
        });
    });
});


describe("exampleRoutingTableRoute", () => {
    let infra: typeof import("./index");
    
    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("routingTableRoute must have a organization id", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute]).apply(([urn, routingTable]) => {
            if (!routingTable?.organizationId) {
                done(new Error(`Missing organization tag on routingTableRoute ${urn}`));
            } else {
                done();
            }
        });
    });

    it("routingTableRoute must have a networkArea id", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute]).apply(([urn, routingTable]) => {
            if (!routingTable?.networkAreaId) {
                done(new Error(`Missing networkAreaId tag on routingTableRoute ${urn}`));
            } else {
                done();
            }
        });
    });

    it("routingTableRoute must have a routingTableId", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute]).apply(([urn, routingTable]) => {
            if (!routingTable?.routingTableId) {
                done(new Error(`Missing routingTableId tag on routingTableRoute ${urn}`));
            } else {
                done();
            }
        });
    });

    it("routingTableRoute must have a destination", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute]).apply(([urn, routingTable]) => {
            if (!routingTable?.destination) {
                done(new Error(`Missing destination tag on routingTableRoute ${urn}`));
            } else {
                done();
            }
        });
    });

    it("routingTableRoute must have a nextHop", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute]).apply(([urn, routingTable]) => {
            if (!routingTable?.nextHop) {
                done(new Error(`Missing nextHop tag on routingTableRoute ${urn}`));
            } else {
                done();
            }
        });
    });

    it("check if organizationId was correctly set", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute.organizationId]).apply(([urn, organizationId]) => {
            if (organizationId === routingTableOrganizationId) {
                done();
            } else {
                done(new Error(`Provided organizationId ${organizationId} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if networkAreaId was correctly set", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute.networkAreaId]).apply(([urn, networkAreaId]) => {
            if (routingTableNetworkAreaId === networkAreaId) {
                done();
            } else {
                done(new Error(`Provided networkAreaId ${networkAreaId} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if routingTableId was correctly set", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute.routingTableId]).apply(([urn, routingTableId]) => {
            if (routingTableId === infra.routingTableId) {
                done();
            } else {
                done(new Error(`Provided routingTableId ${routingTableId} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if destination type was correctly set", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute.destination]).apply(([urn, destination]) => {
            if (destination.type === routingTableRouteDestinationType) {
                done();
            } else {
                done(new Error(`Provided destination type ${destination.type} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if destination value was correctly set", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute.destination]).apply(([urn, destination]) => {
            if (destination.value === routingTableRouteDestinationValue) {
                done();
            } else {
                done(new Error(`Provided destination value ${destination.value} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if nextHop type was correctly set", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute.nextHop]).apply(([urn, nextHop]) => {
            if (nextHop.type === routingTableRouteNextHopType) {
                done();
            } else {
                done(new Error(`Provided nextHop type ${nextHop.type} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if nextHop value was correctly set", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute.nextHop]).apply(([urn, nextHop]) => {
            if (nextHop.value === routingTableRouteNextHopValue) {
                done();
            } else {
                done(new Error(`Provided nextHop value ${nextHop.value} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.exampleRoutingTableRoute.urn, infra.exampleRoutingTableRoute.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[routingTableRouteLabelKey];
            if (actualValue === routingTableRouteLabelValue) {
                done();
            } else {
                done(new Error(`Label '${routingTableRouteLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${routingTableRouteLabelValue} on resource ${urn}`));
            }
        });
    });
});


describe("routingTable datasource test", () => {
    let infra: typeof import("./index");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("check if organizationId was correctly set", function(done) {
        pulumi.all([infra.routingTableDatasource, infra.routingTableDatasource.organizationId]).apply(([urn, organizationId]) => {
            if (organizationId === routingTableOrganizationId) {
                done();
            } else {
                done(new Error(`Provided organizationId ${organizationId} was not set correctly on routingTable ${urn.name}`));
            }
        });
    });

    it("check if networkAreaId was correctly set", function(done) {
        pulumi.all([infra.routingTableDatasource, infra.routingTableDatasource.networkAreaId]).apply(([urn, networkAreaId]) => {
            if (networkAreaId === routingTableNetworkAreaId) {
                done();
            } else {
                done(new Error(`Provided networkAreaId ${networkAreaId} was not set correctly on routingTable ${urn.name}`));
            }
        });
    });

    it("check if routingTableId was correctly set", function(done) {
        pulumi.all([infra.routingTableDatasource, infra.routingTableDatasource.routingTableId]).apply(([urn, routingTableId]) => {
            if (routingTableId === infra.routingTableId) {
                done();
            } else {
                done(new Error(`Provided routingTableId ${routingTableId} was not set correctly on routingTable ${urn.name}`));
            }
        });
    });
});

describe("routingTableRoute datasource test", () => {
    let infra: typeof import("./index");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    it("check if organizationId was correctly set", function(done) {
        pulumi.all([infra.routingTableRouteDatasource, infra.routingTableRouteDatasource.organizationId]).apply(([urn, organizationId]) => {
            if (organizationId === routingTableOrganizationId) {
                done();
            } else {
                done(new Error(`Provided organizationId ${organizationId} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if networkAreaId was correctly set", function(done) {
        pulumi.all([infra.routingTableRouteDatasource, infra.routingTableRouteDatasource.networkAreaId]).apply(([urn, networkAreaId]) => {
            if (networkAreaId === routingTableNetworkAreaId) {
                done();
            } else {
                done(new Error(`Provided networkAreaId ${networkAreaId} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if routingTableId was correctly set", function(done) {
        pulumi.all([infra.routingTableRouteDatasource, infra.routingTableRouteDatasource.routingTableId]).apply(([urn, routingTableId]) => {
            if (routingTableId === infra.routingTableId) {
                done();
            } else {
                done(new Error(`Provided routingTableId ${routingTableId} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if destination type was correctly set", function(done) {
        pulumi.all([infra.routingTableRouteDatasource, infra.routingTableRouteDatasource.destination]).apply(([urn, destination]) => {
            if (destination.type === routingTableRouteDestinationType) {
                done();
            } else {
                done(new Error(`Provided destination type ${destination.type} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if destination value was correctly set", function(done) {
        pulumi.all([infra.routingTableRouteDatasource, infra.routingTableRouteDatasource.destination]).apply(([urn, destination]) => {
            if (destination.value === routingTableRouteDestinationValue) {
                done();
            } else {
                done(new Error(`Provided destination value ${destination.value} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if nextHop type was correctly set", function(done) {
        pulumi.all([infra.routingTableRouteDatasource, infra.routingTableRouteDatasource.nextHop]).apply(([urn, nextHop]) => {
            if (nextHop.type === routingTableRouteNextHopType) {
                done();
            } else {
                done(new Error(`Provided nextHop type ${nextHop.type} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if nextHop value was correctly set", function(done) {
        pulumi.all([infra.routingTableRouteDatasource, infra.routingTableRouteDatasource.nextHop]).apply(([urn, nextHop]) => {
            if (nextHop.value === routingTableRouteNextHopValue) {
                done();
            } else {
                done(new Error(`Provided nextHop value ${nextHop.value} was not set correctly on routingTableRoute ${urn}`));
            }
        });
    });

    it("check if the 'labels' map contains the correct key and value", function(done) {
        pulumi.all([infra.routingTableRouteDatasource, infra.routingTableRouteDatasource.labels]).apply(([urn, labels]) => {
            const actualValue = labels?.[routingTableRouteLabelKey];
            if (actualValue === routingTableRouteLabelValue) {
                done();
            } else {
                done(new Error(`Label '${routingTableRouteLabelKey}' was not set correctly. Actual: ${actualValue}, Expected: ${routingTableRouteLabelValue} on resource ${urn}`));
            }
        });
    });
});