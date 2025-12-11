const express = require("express");
const app = express();
const Connect = require("./src/config/mongodb");
const PORT = process.env.PORT || 3002;

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
app.use("/image", express.static("public/image"));
