import axios from "axios";

export const getRooms = async () => {
  const { data } = await axios.get(
    "http://localhost:8080/room/rooms" +
      "?author=" +
      localStorage.getItem("nickname")
  );
  return data;
};
