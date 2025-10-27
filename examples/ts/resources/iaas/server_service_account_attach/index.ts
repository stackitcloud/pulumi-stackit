import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const attachedServiceAccount = new stackit.ServerServiceAccountAttach("attached_service_account", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    serverId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",           // Replace with your actual server ID
    serviceAccountEmail: "service-account@stackit.cloud",       // Replace with your actual email
});
