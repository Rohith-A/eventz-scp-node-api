const AWS = require('aws-sdk');
const { filterTasksByUserName } = require('../routes/utility/mapCommentHistory');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'bookings';
const userTable = 'authentication'

const getBookings = async (userName) => {
    const params = {
        TableName: TABLE_NAME
    };
    try{
        const bookings = await dynamoClient.scan(params).promise();
        const filteredBookings = await filterTasksByUserName(userName, bookings)
        return filteredBookings;
    } catch(e) {
        return e
    }
}

const addOrUpdateBooking = async (event) => {
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

const getBookingsById = async (id) => {
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

const deleteBooking = async (id) => {
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
    getBookings,
    addOrUpdateBooking,
    getBookingsById,
    deleteBooking,
    getUserId
};
// addOrUpdateCharacter(hpChar);
// getCharacters()
// getCharById('0');
// deleteChar('0')

