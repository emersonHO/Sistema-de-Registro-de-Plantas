import axios from "axios";

const API = "http://localhost:8080/api/auth"; // ajusta según backend

const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
};

const getToken = () => localStorage.getItem("token");

const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

const setUserInfo = (userInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

const register = async (email, password) => {
  const res = await axios.post(`${API}/register`, { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export default { login, logout, getToken, getUserInfo, setUserInfo, register };
