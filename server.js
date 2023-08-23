const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerui = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');
const express = require('express');
const app = express();
const router = require('./routes/userRoutes');

dotenv.config();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use("/", router);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'chat-system API Documentation',
      version: '1.0.0',
      description: 'Welcome to the documentation for the optimized and scalable website project. This documentation provides insights into the architecture, technologies, and best practices used to create a high-performance website.',
      contact: {
        name: 'Cedrick Manzi',
        email: 'cedrickmanzi00@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3500/',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err.message);
});

const port = process.env.PORT || 8800;
const specs = swaggerjsdoc(options);

app.use('/api-docs', swaggerui.serve, swaggerui.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
