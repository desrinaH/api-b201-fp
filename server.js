const express = require('express');
const app = express(); 
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//import route
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use('/video', postsRoute);
app.use('/user', userRoute);

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
