const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerui = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');
const express = require('express');
const path= require('path')
const app = express();
const connectDB = require('./database/connect')
const multer = require('multer')
const bodyparser = require('body-parser')
const useroute = require('./routes/userRoutes');
const subroute = require('./routes/subscribeRoutes');
const storyroute = require('./routes/storyRoutes');
const stateroute = require('./routes/stateRouts');
const settingroute = require('./routes/settingRoutes');
const roomroute = require('./routes/roomRoutes');
const poweroute = require('./routes/powerRoutes');
const owneroute = require('./routes/ownerRoutes');
const notextroute = require('./routes/notextRoutes');
const namesroute = require('./routes/namesRoutes');
const logroute = require('./routes/logRoutes');
const msgroute = require('./routes/intromsgRoutes');
const hitroute = require('./routes/hitRoutes');
const hostroute = require('./routes/hostRoutes');
const bsbroute = require('./routes/bsbRoutes');
const botsroute = require('./routes/botsRouters');
const banroute = require('./routes/banListRoutes');
const cutroute = require('./routes/cutRoutes');
const siteroute = require('./routes/siteRoutes');
const baroute = require('./routes/barRoute');


dotenv.config();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use("/", useroute);
app.use('/bar',baroute)
app.use('/site',siteroute)
app.use('/cut',cutroute)
app.use('/ban',banroute)
app.use('/bots',botsroute)
app.use('/bsb',bsbroute)
app.use('/host',hostroute)
app.use('hit',hitroute)
app.use('/subscribe',subroute)
app.use('/story',storyroute)
app.use('/state',stateroute)
app.use('/setting',settingroute)
app.use('/room',roomroute)
app.use('/power',poweroute)
app.use('/owner',owneroute)
app.use('/notext',notextroute)
app.use('/msg',msgroute)
app.use('/log',logroute)
app.use('/names',namesroute)



connectDB()

app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended: true}))
app.use(bodyparser.json())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))


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

const  storage = multer.diskStorage({
  destination: function(req,file,cb){
    const uniqueSuffix = Date.now() + '-' + Math.random(Math.random() * 1E9) 
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
})
const upload = multer({storage: storage})
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});

const port = process.env.PORT || 8800;
const specs = swaggerjsdoc(options);

app.use('/api-docs', swaggerui.serve, swaggerui.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
