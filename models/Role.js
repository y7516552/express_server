const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role_id: {
        type: Number,
        max: 10,
        required: true,
        unipue: true
    },
    role_name: {
        type: String,
        required: true,
        unipue: true
    },
    role_description: {
        type: String,
        default: ''
    }
})


module.exports = mongoose.model('Role', roleSchema)