import axios from 'axios';

const request = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: 'Basic NDYxOTYxOlN0YXJjcmFmdDI6TG90Vg==',
  },
});

export default request;
