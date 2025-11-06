import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const twoVcpusFilter = stackit.getMachineTypeOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    filter: "vcpus==2",
});
export const filterSortedAscendingFalse = stackit.getMachineTypeOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    filter: "vcpus >= 2 && ram >= 2048",
    sortAscending: false,
});
export const intelIcelakeGenericFilter = stackit.getMachineTypeOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    filter: "extraSpecs.cpu==\"intel-icelake-generic\" && vcpus == 2",
});
// returns warning
export const noMatch = stackit.getMachineTypeOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    filter: "vcpus == 99",
});
