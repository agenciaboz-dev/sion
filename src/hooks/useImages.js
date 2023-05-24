import { api2 } from "../api"

export const useImages = () => {
    const url = api2.getUri().split("/api")[0] + "/static"

    const images = {
        cover: url + "/cover.webp",
    }

    return images
}
