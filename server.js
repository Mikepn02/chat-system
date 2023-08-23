const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const router = require('./routes/userRoutes')


app.use(express.json())
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/chat',router);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err.message);
});
const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});




