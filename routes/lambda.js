// // Use this code snippet in your app.
// // If you need more information about configurations or implementing the sample code, visit the AWS docs:
// // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

// // import {
// //     SecretsManagerClient,
// //     GetSecretValueCommand,
// //   } from "@aws-sdk/client-secrets-manager";
  
// const AWS = require('aws-sdk')
// // clientSecretsManager
// //   const {SecretsManagerClient,
// //     GetSecretValueCommand} =  require('aws-sdk/client-secrets-manager')
//   const secret_name = "dbAccess";
  
//   const client = new AWS.SecretsManager({
//     region: "eu-north-1",
//   });
  
//   let response;
//   const getSec = async () => {
//   try {
//     response = await client.send(
//       new GetSecretValueCommand({
//         SecretId: secret_name,
//         VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
//       })
//     );
//   } catch (error) {
//     // For a list of exceptions thrown, see
//     // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//     throw error;
//   }
  
//   const secret = response.SecretString;
//   console.log(secret);
// }

// getSec();

//   // Your code goes here


const AWS = require('aws-sdk');
const secret_name = "dbAccess";

const client = new AWS.SecretsManager({
    region: "eu-north-1",
});
let response;
const getSec = async () => {
      try {
        response = await client.send(
          new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
        );
      } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
      }
}
getSec();