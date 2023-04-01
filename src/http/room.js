import axios from "axios";

export const getRooms = async () => {
  const { data } = await axios.get(
    "http://localhost:8080/room/rooms" +
      "?author=" +
      localStorage.getItem("nickname")
  );
  return data;
};

export const createRoom = async (name) => {
  const { data } = await axios.post(
    "http://localhost:8080/room/" +
      "?author=" +
      localStorage.getItem("nickname"),
    { name: name, author: localStorage.getItem("nickname") }
  );
  return data;
};

export const getConnectionsToThisGrid = async (id) => {
  const { data } = await axios.get("http://localhost:8080/connect/" + id);
  return data;
};
