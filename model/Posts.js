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
    items:[{
        kind: String,
        etag: String,
        id: String,
        snippet: {
         channelId: String,
         title: String,
         assignable: Boolean
        }
    }]
});

module.exports = mongoose.model('Posts', PostSchema);