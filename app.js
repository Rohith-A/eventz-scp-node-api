const express = require('express');
// const { getCharacters, getCharById, addOrUpdateCharacter, deleteChar } = require('./data/dynamo');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
// const apiRouter = require('./routes/characters');
const authRoutes = require('./routes/auth')
const locationRoutes = require('./routes/locationConverter')
// const taskRoutes = require('./routes/tasks')
bodyParser = require("body-parser"),
app.use(express.json());
const port = process.env.PORT || 3000;
var cors = require('cors')
app.use(cors())

app.get('/', (req,res) => {
    res.send('Hello World');
});

// app.use('/harrypotter', apiRouter)
app.use('/authentication', authRoutes)
app.use('/location', locationRoutes)
// app.use('/tasks', taskRoutes)

app.listen(port, () => {
    console.log('listening on port:', port);
})