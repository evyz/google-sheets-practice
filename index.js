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

const RULES = ["select_field", "change_field", "unselect_field"];
const aWs = ws.getWss("/room");

app.ws("/rooms", (ws, req) => {
  let { nickname, roomId } = req.query;

  if (!nickname || !roomId) {
    ws.send("CHOOSE nickname OR roomId");
    ws.close();
  }

  ws.nickname = nickname;
  ws.roomId = roomId;

  aWs.clients.forEach((client) => {
    if (client.roomId === roomId) {
      let str = JSON.stringify({
        type: "user_connected",
        params: {
          nickname,
          roomId,
        },
      });
      client.send(str);
    }
  });

  ws.on("message", function (msg) {
    try {
      msg = JSON.parse(msg);
      console.log("msg", msg);
      if (!RULES.find((type) => type === msg?.type)) {
        ws.send(JSON.stringify({ error: "NOT CORRECT TYPE" }));
        return;
      }

      switch (msg?.type) {
        case "select_field":
          aWs.clients.forEach((client) => {
            if (client.roomId === roomId) {
              let str = JSON.stringify({
                type: "select_field",
                params: {
                  ...msg?.params,
                  nickname,
                },
              });
              client.send(str);
            }
          });
          break;
      }
    } catch (err) {
      console.log(err);
      ws.send(JSON.stringify({ error: "message must be JSON format" }));
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
