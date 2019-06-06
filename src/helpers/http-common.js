import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://my-lib.ru/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
