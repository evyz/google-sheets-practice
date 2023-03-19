const express = require("express");
const router = express();

let { rooms, users, connections } = require("../utils");

router.post("/register", (req, res) => {
  let { name } = req.body;
  if (users.find((item) => item.name === name)) {
    throw new Error("User with this nick is exist");
  }

  let user = { name: name };
  users.push(user);
  return res.json(user);
});

router.post("/login", (req, res) => {
  let { name } = req.body;
  if (!name || !users.find((item) => item.name === name)) {
    throw new Error("User with this nickname not found");
  }

  return res.json(users.find((item) => item.name === name));
});

module.exports = router;
