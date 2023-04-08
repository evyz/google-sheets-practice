const express = require("express");
const router = express();

let { rooms, users, connections, tables } = require("../utils");

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

router.get("/:id", (req, res) => {
  const { id } = req.params;

  return res.json(tables.find((table) => table.id === Number(id)));
});

router.post("/table/:id", (req, res) => {
  const { type, position } = req.body;
  const { id } = req.params;

  if (type === "add" && (position === "x" || position === "y")) {
    if (tables.find((table) => table.id === Number(id))) {
      let table = tables.find((table) => table.id === Number(id));
      let tableIndex = tables.findIndex((table) => table.id === Number(id));
      if (position === "y") {
        let arrToPush = [];
        for (let i = 0; i < table.fields[0].length; i++) {
          arrToPush.push(null);
        }
        table.fields.push(arrToPush);
      } else {
        table.fields.map((field) => {
          field.push(null);
        });
      }
      tables[tableIndex] = table;
      return res.json("done");
    }
  }
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
