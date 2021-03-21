const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const productsRouter = require('./controllers/products');
const categoriesRouter = require('./controllers/categories');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');

const swaggerDocs = swaggerJsDoc(swaggerOptions);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
