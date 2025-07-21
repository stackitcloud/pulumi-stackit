package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/stackitcloud/pulumi-stackit/sdk/go/stackit"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {

		distribution, err := stackit.NewCdnDistribution(ctx, "cdn", &stackit.CdnDistributionArgs{
			Config: stackit.CdnDistributionConfigArgs{
				Regions: pulumi.StringArray{pulumi.String("EU")},
				Backend: stackit.CdnDistributionConfigBackendArgs{
					Type:      pulumi.String("http"),
					OriginUrl: pulumi.String("https://example.com"),
				},
			},
			ProjectId: pulumi.String("00000000-0000-0000-0000-000000000000"), // Replace with your actual project ID
		})
		if err != nil {
			return err
		}
		ctx.Export("cdnDistributionId", distribution.ID())

		return nil
	})
}
