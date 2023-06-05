import { api } from "../api"
import { useSnackbar } from "burgos-snackbar"

interface ApiOptions {
    data?: object | FormData
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
        url: api.getUri(),
        login: (options: ApiOptions) => {
            api.post("/login", options.data)
                .then((response) => options.callback(response))
                .catch((error) => defaultError(error, options.errorCallback))
                .finally(() => defaultFinally(options.finallyCallback))
        },
        texts: {
            get: (options: ApiOptions) => {
                api.get("/texts")
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
        images: {
            get: (options: ApiOptions) => {
                api.get("/images")
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            update: (options: ApiOptions) => {
                api.post("/images/update", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
        contracts: {
            list: (options: ApiOptions) => {
                api.get("/contracts")
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            update: {
                archive: (options: ApiOptions) => {
                    api.post("/contracts/archive", options.data)
                        .then((response) => options.callback(response))
                        .catch((error) => defaultError(error, options.errorCallback))
                        .finally(() => defaultFinally(options.finallyCallback))
                },
                unarchive: (options: ApiOptions) => {
                    api.post("/contracts/unarchive", options.data)
                        .then((response) => options.callback(response))
                        .catch((error) => defaultError(error, options.errorCallback))
                        .finally(() => defaultFinally(options.finallyCallback))
                },
                approve: (options: ApiOptions) => {
                    api.post("/contracts/approve", options.data)
                        .then((response) => options.callback(response))
                        .catch((error) => defaultError(error, options.errorCallback))
                        .finally(() => defaultFinally(options.finallyCallback))
                },
                disapprove: (options: ApiOptions) => {
                    api.post("/contracts/disapprove", options.data)
                        .then((response) => options.callback(response))
                        .catch((error) => defaultError(error, options.errorCallback))
                        .finally(() => defaultFinally(options.finallyCallback))
                },
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
                name: (options: ApiOptions) => {
                    api.post("/contracts/search", options.data)
                        .then((response) => options.callback(response))
                        .catch((error) => defaultError(error, options.errorCallback))
                        .finally(() => defaultFinally(options.finallyCallback))
                },
            },
        },
        user: {
            list: (options: ApiOptions) => {
                api.get("/user")
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
                name: (options: ApiOptions) => {
                    api.post("/user/search", options.data)
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
            new: (options: ApiOptions) => {
                api.post("/user/new", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            delete: (options: ApiOptions) => {
                api.post("/user/delete", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
        settings: {
            get: (options: ApiOptions) => {
                api.get("/settings")
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
