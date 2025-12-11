const mongoose = require('mongoose');


const MessageSchema  = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    imgUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
MessageSchema.index({ conversationId: 1, createdAt: -1 });




const MessageReactionSchema = new mongoose.Schema({
    messageId: {type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    type: {type: String, enum: ['like', 'love', 'laugh', 'sad', 'angry'], required: true},
    createdAt: {type: Date, default: Date.now},
}, {timestamps: true});
MessageReactionSchema.index({messageId: 1, userId: 1}, {unique: true});



module.exports = {
  Message: mongoose.model('Message', MessageSchema),
  MessageReaction: mongoose.model('MessageReaction', MessageReactionSchema)
};