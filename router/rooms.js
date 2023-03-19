const express = require("express");
const router = express();

let { rooms, users, connections } = require("../utils");

router.get("/rooms", (req, res) => {
  const { author } = req.query;

  if (author && users.find((item) => item.name === author)) {
    let connect = connections.filter((item) => item.authorId === author);
    return res.json(connect);
  }

  throw new Error("Not found name or author in req.body");
});

router.post("/", (req, res) => {
  const { name, author } = req.body;
  if (!name || !author) {
    throw new Error("Not found name or author in req.body");
  }

  console.log("users", users);
  if (!users.find((item) => item.name === author)) {
    throw new Error("Author not found");
  }

  rooms.push({ id: rooms.length, name, author, createdAt: new Date() });
  connections.push({ roomId: rooms.length, authorId: author });

  return res.json({ id: rooms.length, name, author, createdAt: new Date() });
});

module.exports = router;
