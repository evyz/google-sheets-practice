const express = require("express");
const router = express();

let { rooms, users, connections } = require("../utils");

router.get("/rooms", (req, res) => {
  const { author } = req.query;

  if (author && users.find((item) => item.name === author)) {
    let connect = connections.filter((item) => item.authorId === author);
    let arr = [];

    rooms.forEach((room) => {
      let check = connect.find((item) => item.roomId === room.id);
      if (check) {
        arr.push(room);
      }
    });

    return res.json(arr);
  }

  throw new Error("Not found name or author in req.body");
});

router.post("/", (req, res) => {
  const { name, author } = req.body;
  if (!name || !author) {
    throw new Error("Not found name or author in req.body");
  }

  if (!users.find((item) => item.name === author)) {
    throw new Error("Author not found");
  }

  rooms.push({ id: rooms.length, name, author, createdAt: new Date() });
  connections.push({ roomId: rooms.length, authorId: author });

  return res.json({ id: rooms.length, name, author, createdAt: new Date() });
});

router.delete("/:id", (req, res) => {
  let ID = req.params.id;

  const { author } = req.query;

  let elem = rooms.find((item) => item.id === ID),
    elemIndex = rooms.findIndex((item) => item.id === ID);

  if (ID && elem) {
    if (elem.author == author) {
      rooms.splice(elemIndex, 1);
    }
  }

  return res.json({ delete: elem, status: "REMOVED" });
});

module.exports = router;
