import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const _default = stackit.getImageV2Output({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    imageId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",            // Replace with your actual image ID
});
export const nameMatch = stackit.getImageV2Output({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    name: "Ubuntu 22.04",
});
export const nameRegexLatest = stackit.getImageV2Output({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    nameRegex: "^Ubuntu .*",
});
export const nameRegexOldest = stackit.getImageV2Output({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    nameRegex: "^Ubuntu .*",
    sortAscending: true,
});
export const filterDistroVersion = stackit.getImageV2Output({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    filter: {
        distro: "debian",
        version: "11",
    },
});

export const imageIdString = pulumi.interpolate`${nameMatch.imageId}`;