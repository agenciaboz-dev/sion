import React from "react"
import "./style.scss"
import { useImages } from "../../../hooks/useImages"
import { ImageContainer } from "./ImageContainer"

interface ImagesProps {}

export const Images: React.FC<ImagesProps> = ({}) => {
    const images = useImages()
    console.log(images)

    return (
        <div className="Images-Component">
            {images.map((image) => (
                <ImageContainer key={image.src} image={image} />
            ))}
        </div>
    )
}
