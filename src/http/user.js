import axios from "axios";

export const login = async (nickname) => {
  const { data } = await axios.post("http://localhost:8080/user/login", {
    name: nickname,
  });
  return data;
};

export const register = async (nickname) => {
  const { data } = await axios.post("http://localhost:8080/user/register", {
    name: nickname,
  });
  return data;
};
