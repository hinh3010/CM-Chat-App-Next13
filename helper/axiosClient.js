import axios from 'axios';
import { getStorage, setStorage } from './storage';
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || ''

const axiosClient = axios.create({
    baseURL: NEXT_PUBLIC_URL,
    timeout: 60000,
    headers: {
        'content-type': 'application/json;charset=utf-8',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const token = getStorage('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
        error.config._retry = true;
        try {
            console.log('RefreshToken:::')
            const prevRequest = error.config

            const newToken = await refreshAccessToken();

            prevRequest.headers['Authorization'] = `Bearer ${newToken}`
            setStorage('token', newToken)

            return axiosClient(prevRequest);
        } catch (error) {
            // Handle refresh token failed
            throw new Error(error);
        }
    }
    // For other errors, reject the request
    const status = error.response?.status || 500;
    const message = error.message || error

    const newErr = new Error(message)
    newErr.status = status
    throw newErr
});

const refreshAccessToken = async () => {
    const refreshToken = getStorage('refresh-token')
    if (!refreshToken) throw new Error('Refresh token not found')

    const response = await axios.post('/api/refresh-token', { refreshToken });

    const { token: newToken, refreshToken: newRefreshToken } = response.data
    setStorage('refresh-token', newRefreshToken)

    return newToken
};

export default axiosClient;