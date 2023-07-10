require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoutes');
const jobsRouter = require('./routes/jobsRouter');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/auth');
const morgan = require('morgan');
const helmet = require('helmet');
const  xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

// Middleware
app.use(cors());

// Setting up Morgan
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// const __dirname = path.resolve();
app.use(express.static(path.resolve(__dirname, './client/build')));

// Parse JSON request bodies
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Handle root route
app.get('/', (req, res) => {
  res.send('Welcome');
});

// Route handlers
app.use('/auth', authRouter); // Handle routes starting with "/auth"
app.use('/jobs', authenticateUser, jobsRouter); // Handle routes starting with "/jobs"

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

// Handle 404 errors (Not Found)
app.use(notFoundMiddleware);

// Handle other errors
// app.use(errorHandlerMiddleware);

// Define the port to listen on
const port = process.env.PORT || 3000;

// Start the server
const start = async () => {
  await connectDB(process.env.MONGO_URL);
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
