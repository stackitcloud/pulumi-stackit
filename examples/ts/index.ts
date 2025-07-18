import * as stackit from "@stackitcloud/pulumi-stackit";

const distribution = new stackit.CdnDistribution("cdn-distribution", {
    config: {
        regions: [
            "EU"
        ],
        backend: {
            type: "http",
            originUrl: "https://example.com",
        }
    },
    projectId: "00000000-0000-0000-0000-000000000000",
})

export const distributionId = distribution.id;
