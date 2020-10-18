import axios from 'axios';

const baseURL = `${process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_API_URL}`;

const request = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: 'Basic NDYxOTYxOlN0YXJjcmFmdDI6TG90Vg==',
  },
});

export default request;
