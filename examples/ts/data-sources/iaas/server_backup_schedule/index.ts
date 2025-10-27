import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

export const example = stackit.getServerBackupScheduleOutput({
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual project ID
    serverId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",       // Replace with your actual server ID
    backupScheduleId: 12345,                                // Replace with your actual backup schedule ID
});
