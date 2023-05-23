import { api } from "../api"

interface ApiOptions {
    data?: any
    callback: Function
    errorCallback?: Function
    finallyCallback?: Function
}

export const useApi = () => {
    const defaultError = (error: Error, errorCallback?: Function) => {
        errorCallback && errorCallback()
        console.error(error)
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
            },
        },
        user: {
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
