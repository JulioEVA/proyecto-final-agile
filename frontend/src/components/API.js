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

API.updateSorteo = async (id, sorteo) => {
  try {
    return await API.put(`/sorteos/${id}`, sorteo);
  } catch (error) {
    throw error;
  }
};

API.deleteSorteo = async (id) => {
  try {
    return await API.delete(`/sorteos/${id}`);
  } catch (error) {
    throw error;
  }
};

API.deleteSorteo = async (id) => {
  try {
    return await API.delete(`/sorteos/${id}`);
  } catch (error) {
    throw error;
  }
};

API.createPago = async (pago) => {
  try {
    return await API.post('/pagos', pago);
  } catch (error) {
    throw error;
  }
};

API.getPagos = async () => {
  try {
    return await API.get('/pagos');
  } catch (error) {
    throw error;
  }
};

API.login = async (credentials) => {
  try {
    return await API.post('/login', credentials);
  } catch (error) {
    throw error;
  }
};
export default API;
