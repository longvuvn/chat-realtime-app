const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatarImage: {type: String, default: "image/c21f969b5f03d33d43e04f8f136e7682.png" },
    status: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},  
}, { timestamps: true});

UserSchema.index({username: 1}, {unique: true});
const User = mongoose.model('User', UserSchema);
module.exports = User;