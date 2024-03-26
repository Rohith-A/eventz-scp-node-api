// Import required modules
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
// const { route } = require('./locationConverter');

// Connection URI
const uri = 'mongodb+srv://arohith9714:Jul10%402019@cluster0.o3zycso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Database Name
const dbName = 'test_db';

// Create MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Create Express app
const app = express();
const route = express.Router();
app.use(express.json());

// Connect to MongoDB server
client.connect(async (err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('test-collection');

    // Create operation (POST)
    route.post('/api/items', async (req, res) => {
        try {
            const newItem = req.body;
            const insertResult = await collection.insertOne(newItem);
            res.status(201).json(insertResult.ops[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error creating item' });
        }
    });

    // Read operation (GET)
    route.get('/api/items/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const item = await collection.findOne({ _id: ObjectId((id)) });
            if (!item) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching item' });
        }
    });
    route.get('/api/items', async (req, res) => {
        try {
            const id = req.params.id;
            const item = await collection.findOne({ _id: ObjectId(1) });
            if (!item) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }
            try {            const data = res.json(item);
            res.send(data)
        } catch(e) {
            res.send(e)
        }
    
        } catch (error) {
            res.status(500).json({ error: 'Error fetching item' });
        }
    });

    // Update operation (PUT)
    route.put('/api/items/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const updatedItem = req.body;
            const updateResult = await collection.updateOne({ _id: ObjectId(id) }, { $set: updatedItem });
            if (updateResult.modifiedCount === 0) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }
            res.json({ message: 'Item updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating item' });
        }
    });

    // Delete operation (DELETE)
    route.delete('/api/items/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const deleteResult = await collection.deleteOne({ _id: ObjectId(id) });
            if (deleteResult.deletedCount === 0) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }
            res.json({ message: 'Item deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting item' });
        }
    });

    // Start the Express server
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


module.exports = route;