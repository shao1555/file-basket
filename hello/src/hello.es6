import dotenv from 'dotenv';
import aws from 'aws-sdk';

dotenv.config();

aws.config.region = 'ap-northeast-1';
aws.config.credentials = new aws.CognitoIdentityCredentials({
  AccountId: process.env.AWS_ACCOUNT_ID,
  RoleArn: process.env.AWS_COGNITO_ROLE_ARN,
  IdentityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID
});

aws.config.credentials.get( (err) => {
  if (!err) {
    console.log(`Cognito Identity Id: ${aws.config.credentials.identityId}`);
  }
});
