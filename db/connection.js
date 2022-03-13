const mongoose = require('mongoose');

const URI = 
'mongodb+srv://desrina:zHnTTFZuuAuuwq0b@clusdesrina01.zh6ql.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
};

module.exports = {connectDB}; 
