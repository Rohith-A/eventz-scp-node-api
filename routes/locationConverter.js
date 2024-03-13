/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: The Characters managing API
 * /characters:
 *   get:
 *     summary: Create a new book
 *     tags: [Characters]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */

const express = require('express');
const { getCharacters, getCharById, addOrUpdateCharacter } = require('../data/dynamo');
const { getLocationName, getLocationCoordinates } = require('./utility/locationConvertorUtility');
const route = express.Router();


route.post('/coordinates', async(req, res) => {
    try {
        const toConvert = req.body.to || 'name'
        let coordinates = {}
        if(req.body.to === 'name') {
                coordinates = await getLocationName(req.body.latitude, req.body.longitude);
        } else if(req.body.to === 'coordinates') {
                coordinates = await getLocationCoordinates(req.body.name);
        } else {
                coordinates = await getLocationCoordinates('Ireland');
        }
        res.send(coordinates);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});


module.exports=route;