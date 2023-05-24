import { useApi } from "./useApi"

export const useImages = () => {
    const api = useApi()
    const url = api.url.split("/api")[0] + "/static"

    const images = [
        {
            src: url + "/cover.webp",
            name: "Capa",
        },
    ]

    return images
}
