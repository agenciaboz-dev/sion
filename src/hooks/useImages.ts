import { useContext, useEffect } from "react"
import ImagesContext from "../contexts/imagesContext"
import { useApi } from "./useApi"

export const useImages = () => {
    const imagesContext = useContext(ImagesContext)
    const images = imagesContext.value
    const setImages = imagesContext.setValue
    const api = useApi()
    const url = api.url.split("/api")[0] + "/static"

    const updateImage = (image: Image) => {
        setImages(
            [
                ...images.filter((item) => item.id != image.id),
                { ...image, src: `${api.url.split("/api")[0]}/static/${image.src}` },
            ].sort((a, b) => a.id - b.id)
        )
    }

    useEffect(() => {
        console.log(images)
    }, [images])

    return { images, setImages, updateImage }
}
