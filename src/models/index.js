const mongoose = require('mongoose')

const user = {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    created_at: {type: Date, default: Date.now},
    conversations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation'
        }
    ]
}

const userSchema = new mongoose.Schema(user)

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}