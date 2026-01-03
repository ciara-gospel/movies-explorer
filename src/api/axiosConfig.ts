import axios from 'axios';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("URL appelée :", error.config?.url);
        console.error("BaseURL :", error.config?.baseURL);
        return Promise.reject(error);
    }
);

export default api;