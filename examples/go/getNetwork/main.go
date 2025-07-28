package main

import (
	"fmt"

	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/stackitcloud/pulumi-stackit/sdk/go/stackit"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		networkResult, err := stackit.LookupNetwork(ctx, &stackit.LookupNetworkArgs{
			ProjectId: "00000000-0000-0000-0000-000000000000",  // Replace with your actual project ID
			NetworkId: "00000000-0000-0000-0000-000000000000"}) // Replace with your actual network ID
		if err != nil {
			fmt.Println("Error during LookupNetwork %w", err)
		}
		fmt.Println("Network name: ", networkResult.Name)
		return nil
	})
}
