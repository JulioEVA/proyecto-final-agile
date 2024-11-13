import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://proyecto-final-agile.fly.dev/api',
});

API.createSorteo = async (sorteo) => {
  return await API.post('/sorteos', sorteo);
};
