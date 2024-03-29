import axios from 'axios';
import config from '../config.json';

export const api = axios.create({
    baseURL: config.api,
    timeout: 1000 * config.timeout,
})

export const api2 = axios.create({
    // baseURL: "http://localhost:4101/api",
    baseURL: "https://app.agenciaboz.com.br:4101/api",
    timeout: 1000 * config.timeout,
})