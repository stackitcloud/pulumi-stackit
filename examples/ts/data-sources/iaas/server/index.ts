import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getServerOutput({
    projectId: "66b03760-125b-4c63-9624-741e8a418c02",//"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    serverId: "ebc85ab4-8d7b-4a02-9a9f-b8368ab4178f",//"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",       // Replace with your actual server ID
});
