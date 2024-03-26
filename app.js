const express = require('express');
// const { getCharacters, getCharById, addOrUpdateCharacter, deleteChar } = require('./data/dynamo');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
// const apiRouter = require('./routes/characters');
const authRoutes = require('./routes/auth')
const locationRoutes = require('./routes/locationConverter')
const eventRoutes = require('./routes/eventz')
// const monngoDbTestRoutes = require('./routes/mongoDb')
const imageRoutes = require('./routes/images')
// const taskRoutes = require('./routes/tasks')
bodyParser = require("body-parser"),
app.use(express.json({ limit: '30 mb' }));
const port = process.env.PORT || 3000;
var cors = require('cors')
app.use(cors())
express.json({ limit: '10mb' })
app.get('/', (req,res) => {
    res.send('Hello World');
});

// app.use('/harrypotter', apiRouter)
app.use('/authentication', authRoutes)
app.use('/location', locationRoutes)
// app.use('/dbTest', monngoDbTestRoutes)
app.use('/events', eventRoutes)
app.use('/image', imageRoutes)
// app.use('/tasks', taskRoutes)

app.listen(port, () => {
    console.log('listening on port:', port);
})