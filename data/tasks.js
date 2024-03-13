const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'tasks';
const userTable = 'authentication'

const getTasks = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const chars = await dynamoClient.scan(params).promise();
    console.log(chars)
    return chars;
}

const addOrUpdateTask = async (task) => {
    const params = {
        TableName: TABLE_NAME,
        Item: task
    }
    return await dynamoClient.put(params).promise()
}

const getTaskById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            task_id: id
        }
    };
    const char = await dynamoClient.get(params).promise();
    console.log(char);
    return char
};

const getUserId = async (id) => {
    const params = {
        TableName: userTable,
        Key: {
            userName: id
        }
    };
    const char = await dynamoClient.get(params).promise();
    console.log(char);
    return char
};

const deleteTask = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            task_id: id
        }
    }
    return await dynamoClient.delete(params).promise()
}
const hpChar = {
    id: "0",
    name: 'Harry potter'
}

module.exports = {
    dynamoClient,
    getTasks,
    addOrUpdateTask,
    getTaskById,
    deleteTask,
    getUserId
};
// addOrUpdateCharacter(hpChar);
// getCharacters()
// getCharById('0');
// deleteChar('0')

