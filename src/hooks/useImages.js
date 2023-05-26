import { useContext } from "react"
import ImagesContext from "../contexts/imagesContext"

export const useImages = () => {
    const imagesContext = useContext(ImagesContext)
    const images = imagesContext.value

    return images
}
