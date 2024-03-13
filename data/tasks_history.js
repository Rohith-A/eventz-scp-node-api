const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'tasks_history';

const getTasksHistory = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const chars = await dynamoClient.scan(params).promise();
    console.log(chars)
    return chars;
}

const addOrUpdateTaskHistory = async (taskHistory) => {
    const params = {
        TableName: TABLE_NAME,
        Item: taskHistory
    }
    return await dynamoClient.put(params).promise()
}

const getTaskHistoryById = async (id) => {
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

const deleteTaskHistory = async (id) => {
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
    getTasksHistory,
    addOrUpdateTaskHistory,
    getTaskHistoryById,
    deleteTaskHistory
};
// addOrUpdateCharacter(hpChar);
// getCharacters()
// getCharById('0');
// deleteChar('0')