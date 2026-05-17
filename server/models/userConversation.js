const mongoose = require('mongoose');

const UserConversationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: {type: String, default:'New Chat'}
});

module.exports = mongoose.model('UserConversation', UserConversationSchema);