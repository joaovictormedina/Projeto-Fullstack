import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-end-nccq.onrender.com', 
});

export default api;
