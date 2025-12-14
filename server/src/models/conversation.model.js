const mongoose = require("mongoose");

const ParticipantsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const GroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { _id: false }
);


const LastMessageSchema = new mongoose.Schema({
    _id: {type: String,},
    content: {type: String, default: null},
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
    createdAt: {type: Date, default: null},

}, {_id: false});

const ConversationSchema = new mongoose.Schema({
  type: { type: String, enum: ["private", "group"], required: true },
  participants: { type: [ParticipantsSchema], required: true },
  group: { type: [GroupSchema], required: false },
  lastMessageAt: { type: Date },
  seenBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lastMessage: { type: [LastMessageSchema], default: null},
  unreadCounts: { type: Map, of: Number, default: {} },
  
},{timestamps: true,});

ConversationSchema.index({ "participants.userId": 1,lastMessageAt: -1 });
const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;