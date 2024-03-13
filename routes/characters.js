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
const route = express.Router();


route.get('/characters', async(req, res) => {
    try {
        const characters = await getCharacters();
        res.send(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
})

route.get('/characters/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const characterById = await getCharById(id);
        res.send(characterById);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.post('/characters', async(req, res) => {
    const character = req.body;
    try {
        const newCharacter = await addOrUpdateCharacter(character);
        res.send(newCharacter);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.put('/characters/:id', async(req, res) => {
    const character = req.body;
    const {id} = req.params;
    character.id = id
    try {
        const updatedCharacter = await addOrUpdateCharacter(character);
        res.send(updatedCharacter);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.delete('/characters/:id', async(req, res) => {
    const {id} = req.params;
    try {
        res.json(await deleteChar(id));
        // res.send(updatedCharacter);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

module.exports=route;