import aws from 'aws-sdk';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import fs from 'fs';

// aws configuration
dotenv.config();
aws.config.region = 'ap-northeast-1';
aws.config.credentials = new aws.CognitoIdentityCredentials({
  AccountId: process.env.AWS_ACCOUNT_ID,
  RoleArn: process.env.AWS_COGNITO_ROLE_ARN,
  IdentityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID
});

// read file from args
var options = commandLineArgs([
  { name: 'src', type: String, multiple: true, defaultOption: true },
]).parse();

var sourceFiles = options.src;
if(sourceFiles.length > 0) {
  aws.config.credentials.get( (err) => {
    if (!err) {
      console.log(`Cognito Identity Id: ${aws.config.credentials.identityId}`);
      var s3 = new aws.S3({params: {Bucket: process.env.AWS_S3_BUCKET}});
      s3.putObject({
        Key: 'anon/2.jpg',
        Body: fs.createReadStream(sourceFiles[0]),
        ContentType: 'image/jpeg',
        ACL: 'public-read'
      }, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }
      });
    }
  });
}
