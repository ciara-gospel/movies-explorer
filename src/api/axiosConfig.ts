import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'en-US',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data?.status_message || error.message);
        return Promise.reject(error);
    }
);

export default api;