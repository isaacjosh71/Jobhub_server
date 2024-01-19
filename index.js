const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobRouter = require('./routes/job')
const authRouter = require('./routes/auth')
const bodyParser = require('body-parser')

dotenv.config();


//connected to firebase to get uid and send to database for users
const admin = require("firebase-admin");
const serviceAccount = require("./firebase_servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//connect mongoose to server
mongoose.connect(process.env.MONGO_URL).then(()=> console.log('connect to DB')).catch((e)=> console.log(e));

//parse body to json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//api string added to baseUrl
app.use('/api/jobs', jobRouter)
app.use('/api/', authRouter)

app.get('/', (req, res)=> res.send('Hello World!'))
app.listen(process.env.PORT || port, ()=> console.log(process.env.PORT))