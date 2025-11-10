import * as pulumi from "@pulumi/pulumi";
import * as stackit from "@stackitcloud/pulumi-stackit";

const example = new stackit.ResourcemanagerFolder("example", {
    name: "example-folder",
    ownerEmail: "foo.bar@stackit.cloud",                            // Replace with your actual email
    parentContainerId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",      // Replace with your actual container ID
});
// Note:
// You can add projects under folders.
// However, when deleting a project, be aware:
//   - Projects may remain "invisible" for up to 7 days after deletion
//   - During this time, deleting the parent folder may fail because the project is still technically linked
const exampleProject = new stackit.ResourcemanagerProject("example_project", {
    name: "example-project",
    ownerEmail: example.ownerEmail,
    parentContainerId: example.containerId,
});
