const mongoose = require('mongoose')


const connectDB = async() => {
    try{
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then(() => {
            console.log('Connected to MongoDB');
          }).catch((err) => {
            console.log('Error connecting to MongoDB:', err.message);
          });
    }catch(error){
         console.log(error)
         process.exit(1)
    }
}
module.exports = connectDB