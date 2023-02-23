import axios from 'axios'
import 'dotenv/config.js';
import { Modal } from 'antd';

const http = axios.create({
    baseURL: process.env.SERVER_APP_URL,
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
        //Middlewares for error will be added in this scope
        if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {

            Modal.error({
                title: error.response.data.error.message,
                content: error.response.data.error.details,
            });
        }
        else if (!error.response) {
            Modal.error({ content: 'Bilinmeyen Hata.' });
        }

        setTimeout(() => {
            return Promise.reject(error);
        }, 1000);
    }
)

