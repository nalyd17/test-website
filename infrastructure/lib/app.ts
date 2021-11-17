#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { S3Stack } from './stacks/s3-stack';
import { DynamoDbStack } from './stacks/dynamodb-stack';

const app = new cdk.App();

new S3Stack(app, 'websiteBucket', {
    stackName: 'S3',
})

new DynamoDbStack(app, 'users', {
    stackName: 'DynamoDb',
})