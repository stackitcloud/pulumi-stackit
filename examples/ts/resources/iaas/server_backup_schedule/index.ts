import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.ServerBackupSchedule("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",          // Replace with your actual project ID
    serverId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",           // Replace with your actual server ID
    name: "example_backup_schedule_name",
    rrule: "DTSTART;TZID=Europe/Sofia:20200803T023000 RRULE:FREQ=DAILY;INTERVAL=1",
    enabled: true,
    backupProperties: {
        name: "example_backup_name",
        retentionPeriod: 14,
        volumeIds: [],                                          // Add a volume id
    },
});

export const backupScheduleIdString = pulumi.interpolate`${example.backupScheduleId}`;