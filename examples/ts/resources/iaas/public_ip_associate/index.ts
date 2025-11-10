import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.PublicIpAssociate("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",              // Replace with your actual project ID
    publicIpId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",             // Replace with your actual public ip ID
    networkInterfaceId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",     // Replace with your actual network interface ID
});
