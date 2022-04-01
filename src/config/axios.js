import axios from 'axios';

export const instance = axios.create({
  baseURL: 'url',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer <BEARER-TOKEN>`,
  },
});
