const express = require('express');
const { getBookings, getBookingsById, addOrUpdateBooking, deleteBooking } = require('../data/booking');
const { getEventsById, addOrUpdateEvent } = require('../data/eventsSchema');
const route = express.Router();



route.post('/', async(req, res) => {
    try {
        const events = await getBookings(req.body.userName);
        res.send(events);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const bookings = await getBookingsById(id);
        res.send(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.post('/', async(req, res) => {
    try {
        const booking = req.body;
        booking.id = new Date();
        const newBooking = await addOrUpdateBooking(booking);
        const event = await getEventsById(req.body.eventId);
        event.tickets = event.tickets-1;
        await addOrUpdateEvent(event);
        res.send(newBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

route.put('/', async(req, res) => {
    try {
        const booking = req.body;
        const newEvent = await addOrUpdateBooking(booking);
        res.send(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

route.delete('/:id', async(req, res) => {
        const id = req.params.id;
        try {
            // const tasksById = await getTaskById(id);
            const event = await deleteBooking(id);
            res.send('Booking deleted successfully ');
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
});


module.exports = route;