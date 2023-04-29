let users = [{ name: "evyz" }, { name: "root" }],
  rooms = [{ id: 1, name: "First sheet", author: "evyz", tableId: 1 }],
  connections = [
    { roomId: 1, authorId: "evyz" },
    { roomId: 1, authorId: "root" },
  ],
  tables = [
    {
      id: 1,
      fields: [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
      ],
    },
  ];

module.exports = { users, rooms, connections, tables };
