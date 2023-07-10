require('dotenv').config();
require('express-async-errors');
const express = require('express');
const {dirname}=require('path')
const {fileURLToPath}=require('url')
const {path}=require('path')
const app = express();
const cors=require('cors');
const connectDB = require('./db/connect.js');
const authRouter = require('./routes/authRoutes.js');
const jobsRouter = require('./routes/jobsRouter.js');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/auth.js')
const morgan = require('morgan')
const {helmet}=require('helment')
const {xss} =require('xss-clean')
const {mongoSanitize}=require('express-mongo-sanitize')
// Middleware
app.use(cors())
// Setting up Morgan 
if(process.env.NODE_ENV !='production'){
  app.use(morgan('dev'))
}
const __dirname = dirname(fileURLToPath(import.meta.url));
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
