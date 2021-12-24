require('dotenv').config();
require('express-async-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const connectDb = require('./db/connect')


const mainRouter = require('./routes/main');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
//load fe index.html
app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api', mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const port_DB = process.env.PORT_DB
const start = async () => {
  try {
    connectDb(port_DB)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
