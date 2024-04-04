const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const express = require('express');
  const app = express();
  const swaggerUi = require('swagger-ui-express');
  const swaggerJsDoc = require('swagger-jsdoc');
  const authRoutes = require('./routes/auth');
  const locationRoutes = require('./routes/locationConverter');
  const eventRoutes = require('./routes/eventz');
  const imageRoutes = require('./routes/images');
  const bookingRoutes = require('./routes/bookings');
  const bodyParser = require('body-parser');

  app.use(express.json({ limit: '30mb' }));
  app.use(express.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const port = process.env.PORT || 3000;

  var cors = require('cors');
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.use('/authentication', authRoutes);
  app.use('/location', locationRoutes);
  app.use('/events', eventRoutes);
  app.use('/image', imageRoutes);
  app.use('/booking', bookingRoutes);

  app.listen(port, () => {
    console.log(`Worker ${process.pid} listening on port ${port}`);
  });
}
