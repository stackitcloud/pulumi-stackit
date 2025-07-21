using System.Collections.Generic;
using Pulumi;
using Pulumi.Stackit;

return await Deployment.RunAsync(async () =>
{
    // Replace with your actual project ID and network ID
    string projectId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
    string networkId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

    // Create arguments for getting the network
    var args = new GetNetworkArgs
    {
        ProjectId = projectId,
        NetworkId = networkId
    };

    var networkResult = await GetNetwork.InvokeAsync(args);

    // Export outputs here
    return new Dictionary<string, object?>
    {
        ["outputKey"] = networkResult.Name
    };
});
