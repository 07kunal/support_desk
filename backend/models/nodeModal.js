const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Ticket",
    },
    text: {
        type: String,
        required: [true, 'please add some text '],
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String,

    },

}, {
    timestamps: true,
})
module.exports = mongoose.model('Note', noteSchema)