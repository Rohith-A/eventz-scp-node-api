const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'harypotter-api';

const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const chars = await dynamoClient.scan(params).promise();
    console.log(chars)
    return chars;
}

const addOrUpdateCharacter = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character
    }
    return await dynamoClient.put(params).promise()
}

const getCharById = async (id) => {
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

const deleteChar = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
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
    getCharacters,
    addOrUpdateCharacter,
    getCharById,
    deleteChar
};
// addOrUpdateCharacter(hpChar);
// getCharacters()
// getCharById('0');
// deleteChar('0')