import axios from "axios";

export const instance = axios.create({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    "Authorization": '123',
    'locale': 'en',
  },
  baseURL: 'http://localhost:8080/',
})

// export const instance = axios.create({
//   responseType: 'json',
//   headers: {
//     'Content-Type': 'application/json',
//     "Authorization": `${authIntercabStore.getState().authIntercab.user.accessToken}`,
//     'Consumer-key': process.env.REACT_APP_CONSUMER_KEY,
//     'locale': 'en',
//   },
//   baseURL: process.env.REACT_APP_API_URI + 'generalregister/v1/general-register/',
// })


export const login = (payload: any) => {
  const url = 'http://localhost:8080/';
  return instance.post(url, payload);
};
