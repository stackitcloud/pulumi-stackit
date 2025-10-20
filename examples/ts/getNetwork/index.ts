import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const networkLookupArgs: stackit.GetNetworkArgs = {
            projectId: "00000000-0000-0000-0000-000000000000",  // Replace with your actual project ID
            networkId: "00000000-0000-0000-0000-000000000000",  // Replace with your actual network ID
        };

export = async() => {
    const networkResult: stackit.GetNetworkResult = await stackit.getNetwork(networkLookupArgs);
    return {
        networkName: networkResult.name
    }
}
