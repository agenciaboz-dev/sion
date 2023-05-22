import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4101/api",
    // baseURL: "https://app.agenciaboz.com.br:4101/api",
    timeout: 1000 * 10,
})
