const express = require('express');
const app = express(); 
const mongoose = require ('mongoose');
require('dotenv/config');

//import route
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);
//app.use('/user', userRoute);

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