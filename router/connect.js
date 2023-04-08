const express = require("express");
const router = express();

let { rooms, users, connections } = require("../utils");

router.post("/:id", (req, res) => {
  let id = Number(req.params.id);
  let author = req.body.author;
  let guest = req.body.guest;

  if (!author || !id) {
    throw new Error("Choose author or id");
  }

  if (!rooms.find((item) => item.id === id)) {
    throw new Error("Room not found");
  }

  let room = rooms.find((item) => item.id === id);

  if (room.author !== author) {
    throw new Error("You`re not author to this sheet");
  }

  let connection = { roomId: room.id, authorId: guest };

  if (guest && users.find((item) => item.name === guest)) {
    connections.push(connection);
  }
  return res.json(connection);
});

router.get("/:id", (req, res) => {
  let roomId = req.params.id;
  roomId = Number(roomId);

  if (roomId && rooms.find((room) => room.id === roomId)) {
    let id = rooms.find((room) => room.id === roomId).id;
    let arr = [];
    connections.forEach(
      (connect) => connect.roomId === id && arr.push(connect.authorId)
    );

    return res.json(arr);
  }

  return res.json({});
});
module.exports = router;
