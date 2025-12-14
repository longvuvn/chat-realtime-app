const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
    fromUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    toUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    message: {type: String, maxlength: 300},
    status: {type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending'},
}, {timestamps: true});

FriendRequestSchema.index({fromUserId: 1, toUserId: 1}, {unique: true});
FriendRequestSchema.index({fromUserId: 1});
FriendRequestSchema.index({toUserId: 1});
const FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema);
module.exports = FriendRequest; 