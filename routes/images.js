const express = require('express');
const AWS = require('aws-sdk');
const route = express.Router();

// Configure AWS
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}); // Replace 'your-region' with your AWS region

// Create an instance of DynamoDB Document Client
const dynamoDB = new AWS.DynamoDB.DocumentClient();



// API endpoint for uploading images to DynamoDB
route.post('/upload', async (req, res) => {
    try {
        const { imageName, imageData } = req.body;

        // Convert base64 image data to binary buffer
        const imageBuffer = Buffer.from(imageData, 'base64');

        // Define parameters for putting an item into DynamoDB
        const params = {
            TableName: 'Images',
            Item: {
                imageName: req.body.imageName,
                imageData: imageBuffer
            }
        };

        // Put the item into DynamoDB
        await dynamoDB.put(params).promise();

        res.json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// API endpoint for retrieving images from DynamoDB
route.get('/images/:imageName', async (req, res) => {
    try {
        const { imageName } = req.params;

        // Define parameters for getting an item from DynamoDB
        const params = {
            TableName: 'Images',
            Key: {
                imageName: imageName
            }
        };

        // Get the item from DynamoDB
        const data = await dynamoDB.get(params).promise();

        if (!data.Item) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Convert binary image data to base64
        const base64Data = data.Item.imageData.toString('base64');
        res.json({ imageName: imageName, imageData: base64Data });
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ error: 'Failed to retrieve image' });
    }
});

module.exports = route;