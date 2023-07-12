import axios from 'axios';
import config from '../config.json';

export const api = axios.create({
    baseURL: "https://app.agenciaboz.com.br:4101/api",
    timeout: 1000 * config.timeout,
})
