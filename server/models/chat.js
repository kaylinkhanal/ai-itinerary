const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [
        {
        sender: { type: String, enum: ['user', 'AI'], required: true },
        userPrompt: { type: String},
        AIresponse: { type: String },
        timestamp: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Chat', ChatSchema);