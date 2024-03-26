const express = require('express');
const { getEventz, addOrUpdateEvent, deleteEvent, getEventsById } = require('../data/eventsSchema');
const { getLocationCoordinates } = require('./utility/locationConvertorUtility');
const route = express.Router();



route.get('/', async(req, res) => {
    try {
        const events = await getEventz();
        res.send(events);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const events = await getEventsById(id);
        res.send(events);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.post('/', async(req, res) => {
    try {
        const event = req.body;
        event.event_id = new Date()+''.split(' ').join();
        const coordinates = await getLocationCoordinates(event.eventVenue);
        event.eventLat = coordinates.latitude+''
        event.eventLong = coordinates.longitude+''
        await addOrUpdateEvent(event)
        const events = await getEventz();
        res.send(events);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.put('/', async(req, res) => {
    try {
        const event = req.body;
        const newEvent = await addOrUpdateEvent(event)
        res.send(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.delete('/:id', async(req, res) => {
        const id = req.params.id;
        try {
            // const tasksById = await getTaskById(id);
            const event = await deleteEvent(id);
            res.send('Event deleted successfully ');
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
});


module.exports = route;