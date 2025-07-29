import axios from "axios";
import AuthService from "./AuthService";

const API = "http://localhost:8080/api/hierbas";

const config = () => ({
  headers: {
    Authorization: `Bearer ${AuthService.getToken()}`
  }
});

export const getHierbas = () => axios.get(API, config());
export const addHierba = (hierba) => axios.post(API, hierba, config());
export const deleteHierba = (id) => axios.delete(`${API}/${id}`, config());
