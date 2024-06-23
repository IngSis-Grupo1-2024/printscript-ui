import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const userToken = localStorage.getItem('token')
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
            return config;
        } catch (error) {
            return Promise.reject(error)
        }
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;