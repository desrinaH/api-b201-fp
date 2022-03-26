const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    kind: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    etag: {
        type: String,
        required: true
    },
        kindItem:{
            type: String,
            required: true
        },
        etagItem:{
            type: String,
            required: true
        },
        id:{
            type: String,
            required: true
        },
        channelId:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        assignable:{
            type: Boolean,
            required: true
        } 
    
    
 
});

module.exports = mongoose.model('Posts', PostSchema);
