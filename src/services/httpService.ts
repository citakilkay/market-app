import axios from 'axios'

const http = axios.create({
    baseURL: AppConst.remoteServiceBaseUrl,
    timeout: 30000
});