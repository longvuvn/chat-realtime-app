const express = require("express");
const app = express();
const Connect = require("./src/config/mongodb.config");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3002;
const UserRouter = require('./src/routes/user.routes'); 
const MessageRouter = require('./src/routes/message.routes');
const FriendRouter = require('./src/routes/friend.routes');
const ConversationRouter = require('./src/routes/conversation.routes');
const AuthRouter = require('./src/routes/auth.routes');
const logger = require('morgan');

async function startServer() {
  try {
    await Connect();
    app.listen(PORT, () => {
      console.log('Server is running on port 3001');
    });
  } catch (err) {
    console.error('Kết nối MongoDB thất bại', err);
  }
}
startServer();

app.use(logger('dev'));

app.use("/image", express.static("public/image"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/messages", MessageRouter);
app.use("/api/v1/friends", FriendRouter);
app.use("/api/v1/conversations", ConversationRouter);
app.use("/api/v1/auth", AuthRouter);
