import axios from "axios";

const API = "http://localhost:8080/api/auth"; // ajusta según backend

const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const getToken = () => localStorage.getItem("token");

export default { login, logout, getToken };
