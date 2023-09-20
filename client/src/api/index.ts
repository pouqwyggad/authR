import axios from "axios";

// базовый url
export const API_URL = "http://localhost:5000/api"

const api = axios.create({
    withCredentials: true, //Axios-клиент будет отправлять запросы с использованием куки
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

export default api