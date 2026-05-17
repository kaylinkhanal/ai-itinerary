const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userConversation: { type: mongoose.Schema.Types.ObjectId, ref: 'UserConversation', required: true },
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