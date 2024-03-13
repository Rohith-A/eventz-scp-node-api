const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'tasks_comments';

const getTasksComments = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const chars = await dynamoClient.scan(params).promise();
    console.log(chars)
    return chars;
}

const addOrUpdateTaskComments = async (taskComment) => {
    const params = {
        TableName: TABLE_NAME,
        Item: taskComment
    }
    return await dynamoClient.put(params).promise()
}

const getTaskCommentsById = async (id) => {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id
            }
        };
        const char = await dynamoClient.get(params).promise();
        console.log(char);
        return char
    };

const deleteTaskComments = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    };
    const char = await dynamoClient.delete(params).promise();
    console.log(char);
    return char
}
const hpChar = {
    id: "0",
    name: 'Harry potter'
}

module.exports = {
    dynamoClient,
    getTasksComments,
    addOrUpdateTaskComments,
    getTaskCommentsById,
    deleteTaskComments
};
// addOrUpdateCharacter(hpChar);
// getCharacters()
// getCharById('0');
// deleteChar('0')