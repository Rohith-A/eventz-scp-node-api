const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
// const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { idGenerator } = require('saveit-data-uitility');
"use strict";

// generate a hash from string
key = "";
const TABLE_NAME = "authentication";


/* AWS CONF. BOL */
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const docClient = new AWS.DynamoDB.DocumentClient();

/*
----------------------------
    Registration section
----------------------------
*/
router.post('/registration', function (req, res, next) {
    /* Paramaters */
    const empId_from_header = req.body.empId?.toString();
    const fullName_from_header = req.body.fullName?.toString();
    const fullUserName = fullName_from_header.replaceAll(' ', '');
    const username_from_header = `${fullUserName}_${empId_from_header}`;
    const email_from_header = req.body.email?.toString();
    const RAWpassword_from_header = req.body.password?.toString();

    //Read for current user.

    const params = {
        TableName: TABLE_NAME,
        Key: {
            "userName": username_from_header,
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            res.json({ "Error": { "Critical": "Unable to read item. Error JSON:" + err } });
        } else {
            response = "GetItem succeeded: " + JSON.stringify(data, null, 2);
            if (response === "GetItem succeeded: {}") {
                addUser();
            }
            else {
                res.json({ "Warning": { "Response": "Unable to add user, because the username, and or, email address is already associated with an existing account. Recover your account with Password Recovery, and have the password sent to your e-mail." } });
            };
        }
    });
    function addUser() {
        // create hahs
        const hash = crypto.createHmac('sha512', key);
        hash.update(RAWpassword_from_header);
        const hashed_pass = hash.digest('hex').toString();

        /* INTO DATABASE */
        const paramsWrite = {
            TableName: TABLE_NAME,
            Item: {
                "password_SHA512": hashed_pass,
                "fullName": fullName_from_header,
                "empId": empId_from_header,
                "email": email_from_header,
                "userName": username_from_header,
                "dateCreated": Date().toString(),
                "userEnabled": 1
            }
        };
        docClient.put(paramsWrite, function (err, data) {
            if (err) {
                res.json({ "Error": { "Critical": "Unable to add item. Error JSON:" + err } });
            } else {
                res.json({ "OK": { "Response": "Thanks for signing up!" } });
            }
        });
    };
});

/*
----------------------------
      Login section
----------------------------
*/
// router.post('/login', function (req, res, next) {
//     const username_from_header = req.body.userName?.toString();
//     const password_from_header = req.body.password?.toString();

//     //Generate password from header submission
//     const hash = crypto.createHmac('sha512', key);
//     hash.update(password_from_header);
//     const hashed_pass = hash.digest('hex').toString();
//     const SearchHashedPass = hashed_pass;

//     const params = {
//         TableName: TABLE_NAME,
//         Key: {
//             "userName": username_from_header
//         }
//     };
//     function SessionID_Generator() {
//         function s4() {
//             return Math.floor((1 + Math.random()) * 0x10000)
//                 .toString(16)
//                 .substring(1);
//         }
//         return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//             s4() + '-' + s4() + s4() + s4();
//     }
//     function writeSessiontoDB(SessionID) {
//         const WriteSessionID = {
//             TableName: "AuthenticationSessionKeys",
//             Item: {
//                 id: idGenerator(),
//                 "SessionId": SessionID,
//                 "userName": username_from_header,
//                 "createDate": Date().toString()

//             }
//         };
//         docClient.put(WriteSessionID, function (err, data) {
//             if (err) {
//                 console.log("Unable to add item. Error JSON:", err, 2);
//             } else {
//             }
//         });
//     };

//     docClient.get(params, function (err, data) {
//         if (err) {
//             res.json({ "Error": { "Critical": "Unable to read item. " + err } });
//         } else {
//             for (hashed_pass in data) {
//                 foundpassword_from_DB = data.Item.password_SHA512;
//                 if (SearchHashedPass === foundpassword_from_DB) {
//                     const SessionID = SessionID_Generator()
//                     writeSessiontoDB(SessionID)
//                     res.send({
//                         "OK": {
//                             "SessionID": SessionID,
//                             "userName": username_from_header
//                         }
//                     });
//                 } else {
//                     res.json({ "Warning": { "Response": "Login failed, credentials are incorrect." } });
//                     // Commit IP to the BLOCK DB after 10 attempts
//                 }
//             }
//         };

//     });
// });

router.post('/login',  async (req, res, next) => {
    let username_from_header = req.body.userName.toString();
    let password_from_header = req.body.password.toString();
  
  //Generate password from header submission
    const hash = crypto.createHmac('sha512', key);
    hash.update(password_from_header);
    let hashed_pass = hash.digest('hex').toString();
    let SearchHashedPass = hashed_pass;
  
      const params = {
          TableName: TABLE_NAME,
          Key:{
              "userName": username_from_header
          }
      };
      function SessionID_Generator() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
        }
//   function writeSessiontoDB(SessionID){
//         var WriteSessionID = {
//             TableName:"AuthenticationSessionKeys",
//             Item:{
//                 id: idGenerator(),
//                 "SessionId": SessionID,
//                 "userName": username_from_header,
//                 "createDate": Date().toString()
  
//             }
//         };
//         docClient.put(WriteSessionID, function(err, data) {
//             if (err) {
//                 console.log("Unable to add item. Error JSON:",err, 2);
//             } else {
//             }
//         });
//   };
 docClient.get(params, function(err, data) {
    if (err) {
        res.json({"Error":{"Critical":"Unable to read item. "+err}});
    } else {
      for(hashed_pass in data){
        foundpassword_from_DB = data.Item.password_SHA512;
        if (SearchHashedPass === foundpassword_from_DB){
          var SessionID = SessionID_Generator()
        //   writeSessiontoDB(SessionID)
          res.send({"OK":{"SessionID":SessionID, userName: username_from_header}});
          return;
      } else {
        res.json({"Warning":{"Response":"Login failed, credentials are incorrect."}});
        // Commit IP to the BLOCK DB after 10 attempts
      }
        }
};
res.json({"Warning":{"Response":"Login failed, credentials are incorrect."}});

});
// const user = await docClient.get(params).promise();
// console.log(user);
// if(user.Item) {
//         for(hashed_pass in user){
//           foundpassword_from_DB = data.Item.password_SHA512;
//           if (SearchHashedPass === foundpassword_from_DB){
//             var SessionID = SessionID_Generator()
//             writeSessiontoDB(SessionID)
//             res.send({"OK":{"SessionID":SessionID}});
//         } else {
//           res.json({"Warning":{"Response":"Login failed, credentials are incorrect."}});
//           // Commit IP to the BLOCK DB after 10 attempts
//         }
//           }
//         }
//         res.send({"error": {"Warning":{"Response":"Login failed, credentials are incorrect."}}});

  });

const getUsers = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const users = await docClient.scan(params).promise();
    return users;
}

router.get('/users', async(req, res) => {
    try {
        // const tasksById = await getTaskById(id);
        const users = await getUsers();

        const userNames = users.Items?.map((user) => user.userName);
        // tasksById.comments = taskComment;
        res.send({userNames});
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

module.exports = router;