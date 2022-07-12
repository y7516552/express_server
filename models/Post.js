const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts', PostSchema)