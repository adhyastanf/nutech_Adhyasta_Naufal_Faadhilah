import { logoutUser } from '@/store/auth-slice';
import { store } from '@/store/configureStore';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://take-home-test-api.nutech-integrasi.com',
});

const apiNoAuth = axios.create({
  baseURL: 'https://take-home-test-api.nutech-integrasi.com',
});

api.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logoutUser());
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export async function fetchRegistration({ email, password, first_name, last_name }) {
  const body = { email, password, first_name, last_name };
  const response = await apiNoAuth.post('/registration', body);
  return response;
}
export async function fetchLogin({ email, password }) {
  const body = { email, password };
  const response = await apiNoAuth.post('/login', body);
  return response;
}

export async function getProfile() {
  const response = await api.get('/profile');
  return response;
}

export async function updatedProfile({ email, first_name, last_name }) {
  const body = { email, first_name, last_name };
  const response = await api.put('/profile/update', body);
  return response;
}

export async function updatedImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.put('/profile/image', formData);
  return response;
}

export async function getBanner() {
  const response = await api.get('/banner');
  return response;
}

export async function getServices() {
  const response = await api.get('/services');
  return response;
}

export async function getBalance() {
  const response = await api.get('/balance');
  return response;
}

export async function topupBalance({ top_up_amount }) {
  const body = { top_up_amount };
  const response = await api.post('/topup', body);
  return response;
}

export async function postTransaction({ service_code }) {
  const body = { service_code };
  const response = await api.post('/transaction', body);
  return response;
}

export async function getTransactionHistory(offset, limit) {
  const response = await api.get(`/transaction/history?offset=${offset}&limit=${limit}`);
  return response;
}

export default api;
