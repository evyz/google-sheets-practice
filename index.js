const express = require("express");
const app = express();
const cors = require("cors");
const ws = require("express-ws")(app);

let { rooms, users, connections } = require("./utils");

app.use(express.json());
app.use(cors());

const userApi = require("./router/users");
const roomApi = require("./router/rooms");
const connectionApi = require("./router/connect");

const PORT = process.env.PORT || 8080;

app.use("/user", userApi);
app.use("/room", roomApi);
app.use("/connect", connectionApi);

app.ws("/room/:id", (ws, req) => {
  let { nickname } = req.query;
  if (!nickname) {
    ws.close();
  }

  ws.on("message", function (msg) {
    try {
      JSON.parse(msg);
    } catch (err) {
      ws.send("message must be JSON format");
    }
    ws.send(msg);
  });
});
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
