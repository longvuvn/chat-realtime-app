const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    userName: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true, lowercase: true},
    password: {type: String, required: true, select: false},
    avatarImage: {type: String, default: "image/c21f969b5f03d33d43e04f8f136e7682.png" },
    status: {type: String, enum: ['active', 'inactive', 'blocked'], default: 'active' },  
}, { timestamps: true});

UserSchema.index({userName: 1}, {unique: true});
const User = mongoose.model('User', UserSchema);
module.exports = User;