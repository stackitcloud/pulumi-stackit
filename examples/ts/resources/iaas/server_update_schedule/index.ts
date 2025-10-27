import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.ServerUpdateSchedule("example", {
    projectId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",              // Replace with your actual project ID
    serverId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",               // Replace with your actual server ID
    name: "example_update_schedule_name",
    rrule: "DTSTART;TZID=Europe/Sofia:20200803T023000 RRULE:FREQ=DAILY;INTERVAL=1",
    enabled: true,
    maintenanceWindow: 1,
});

export const updateScheduleIdString = pulumi.interpolate`${example.updateScheduleId}`;