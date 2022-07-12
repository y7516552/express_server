const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unipue: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unipue: true
    },
    role_id:{
        type: Number,
        trim: true,
        default: 4
    },
    group_id: {
        type: Number,
        trim: true,
        default: 0,
    },
    creat_at: {
        type: Date,
        default: Date.now(),
    }
})


module.exports = mongoose.model('User', UserSchema)