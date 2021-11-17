import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';

export class S3Stack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const bucket = new s3.Bucket(this, id, {
            bucketName: 'dylan-brown-test-website',
            websiteIndexDocument: 'index.html',
            blockPublicAccess: new s3.BlockPublicAccess({ restrictPublicBuckets: false }),
        })

        const bucketPolicy = new iam.PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [
              `${bucket.bucketArn}/*`
            ],
            principals: [new iam.AnyPrincipal()],
          })
          bucket.addToResourcePolicy(bucketPolicy);

        new s3Deployment.BucketDeployment(this, 'DeployWebsite', {
            sources: [s3Deployment.Source.asset('../client/build')],
            destinationBucket: bucket,
        })
    }
}