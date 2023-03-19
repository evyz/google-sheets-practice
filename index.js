const express = require("express");
const app = express();
const cors = require("cors");

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

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
