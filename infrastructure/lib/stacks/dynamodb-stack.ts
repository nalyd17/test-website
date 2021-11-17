import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class DynamoDbStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const table = new dynamodb.Table(this, id, {
            tableName: 'Users',
            partitionKey: {name: 'userId', type: dynamodb.AttributeType.STRING},
            pointInTimeRecovery: true,
            billingMode: dynamodb.BillingMode.PROVISIONED,
            readCapacity: 10,
            writeCapacity: 10,
        })
    }
}