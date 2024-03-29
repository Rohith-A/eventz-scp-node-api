const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'eventz';
const userTable = 'authentication'

const getEventz = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    try{
        const events = await dynamoClient.scan(params).promise();
        return events;
    } catch(e) {
        return e
    }
}

const addOrUpdateEvent = async (event) => {
    const params = {
        TableName: TABLE_NAME,
        Item: event
    }
    try {
        return await dynamoClient.put(params).promise()
    } catch(e) {
        return e
    }
    
}

const getEventsById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            event_id: id
        }
    };
    try {
        const event = await dynamoClient.get(params).promise();
        return event
    } catch(e) {
        return e
    }   
};

const getUserId = async (id) => {
    const params = {
        TableName: userTable,
        Key: {
            userName: id
        }
    };
    try {
        const user = await dynamoClient.get(params).promise();
        return user
    } catch(e) {
        return e
    }
};

const deleteEvent = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            event_id: id
        }
    }
    try {
        return await dynamoClient.delete(params).promise()
    } catch(e) {
        return e
    }
}

module.exports = {
    dynamoClient,
    getEventz,
    addOrUpdateEvent,
    getEventsById,
    deleteEvent,
    getUserId
};
// addOrUpdateCharacter(hpChar);
// getCharacters()
// getCharById('0');
// deleteChar('0')

