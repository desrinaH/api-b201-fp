const express = require('express');
const app = express(); 
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');


app.use(express.json());


//import route
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');


app.use('/video', postsRoute);
app.use('/api/user', authRoute);


//Route
app.get('/', (req, res) => {
    res.send('its get');
});


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    () => console.log('connected to DB')
);


app.listen(3000);
