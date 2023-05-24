import { api } from "../api"
import { useSnackbar } from "./useSnackbar"

interface ApiOptions {
    data?: any
    callback: Function
    errorCallback?: Function
    finallyCallback?: Function
}

export const useApi = () => {
    const { snackbar } = useSnackbar()

    const defaultError = (error: Error, errorCallback?: Function) => {
        errorCallback && errorCallback()
        console.error(error)
        snackbar({
            severity: "error",
            text: "Erro desconhecido",
        })
    }

    const defaultFinally = (finallyCallback?: Function) => {
        finallyCallback && finallyCallback()
    }

    const methods = {
        login: (options: ApiOptions) => {
            api.post("/login", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },
        texts: {
            get: (options: ApiOptions) => {
                api.get("/texts", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            update: (options: ApiOptions) => {
                api.post("/texts/update", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
        contracts: {
            list: (options: ApiOptions) => {
                api.get("/contracts", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            find: {
                id: (options: ApiOptions) => {
                    api.post("/contracts/id", options.data)
                        .then((response) => options.callback(response))
                        .catch((error) => defaultError(error, options.errorCallback))
                        .finally(() => defaultFinally(options.finallyCallback))
                },
                seller: (options: ApiOptions) => {
                    api.post("/contracts/seller", options.data)
                        .then((response) => options.callback(response))
                        .catch((error) => defaultError(error, options.errorCallback))
                        .finally(() => defaultFinally(options.finallyCallback))
                },
            },
        },
        user: {
            list: (options: ApiOptions) => {
                api.get("/user", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            find: {
                id: (options: ApiOptions) => {
                    api.post("/user/id", options.data)
                        .then((response) => options.callback(response))
                        .catch((error) => defaultError(error, options.errorCallback))
                        .finally(() => defaultFinally(options.finallyCallback))
                },
            },
            update: (options: ApiOptions) => {
                api.post("/user/update", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            password: (options: ApiOptions) => {
                api.post("/user/password", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            email: (options: ApiOptions) => {
                api.post("/user/email", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
        settings: {
            get: (options: ApiOptions) => {
                api.get("/settings", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            rate: (options: ApiOptions) => {
                api.post("/settings/rate", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
    }

    return methods
}
