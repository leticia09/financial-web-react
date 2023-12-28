import axios from "axios";

export const instance = axios.create({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    "Authorization": '123',
    'locale': 'en',
  },
  baseURL: 'http://192.168.43.146:8080/',
})


export const login = (payload: any) => {
  const url = 'http://192.168.43.146:8080/';
  return instance.post(url, payload);
};
