const mongoose = require('mongoose');


const FriendSchema = new mongoose.Schema({
    userSenderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},  
    userReceiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: {type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},  
},{ timestamps: true});

FriendSchema.pre('save', function (next){
    const userSenderId = this.userSenderId.toString();
    const userReceiverId = this.userReceiverId.toString();
    if(userSenderId > userReceiverId){
        this.userSenderId = mongoose.Types.ObjectId(userReceiverId);
        this.userReceiverId = mongoose.Types.ObjectId(userSenderId);
    }
    next();
});
FriendSchema.index({userSenderId: 1, userReceiverId: 1}, {unique: true});
const Friend = mongoose.model('Friend', FriendSchema);
module.exports = Friend;