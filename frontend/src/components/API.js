import axios from 'axios';

const API = axios.create({
  baseURL: 'https://proyecto-final-agile.fly.dev/api',
});

API.createSorteo = async (sorteo) => {
  try {
    return await API.post('/sorteos', sorteo);
  } catch (error) {
    throw error;
  }
};

API.getSorteos = async () => {
  try {
    return await API.get('/sorteos');
  } catch (error) {
    throw error;
  }
};

API.getSorteo = async (id) => {
  try {
    return await API.get(`/sorteos/${id}`);
  } catch (error) {
    throw error;
  }
};

export default API;
