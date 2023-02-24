import axios from 'axios'
import { Modal } from 'antd';

const http = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 30000
});

http.interceptors.request.use(
    function (config) {
        //Middlewares for request will be added in this scope
        // Authorization and other common headers will be added in this scope
        return config
    },
    function (error) {
        return Promise.reject(error);
    }
)

http.interceptors.response.use(
    response => {
        //Middlewares for response will be added in this scope
        return response;
    },
    error => {
        console.log(error, "this is my error")
        //Middlewares for error will be added in this scope
        if (!!error.response.data.message) {
            Modal.error({
                title: error.message,
                content: error.response.data.message,
            });
        }
        else if (!error.response?.data?.message) {
            Modal.error({ content: 'Bilinmeyen Hata.' });
        }

        setTimeout(() => {
            return Promise.reject(error);
        }, 1000);
    }
)

export default http

