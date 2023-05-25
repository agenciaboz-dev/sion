import React, { useState } from "react"
import { Image } from "../../../definitions/images"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import { SxProps, Skeleton } from "@mui/material"
import Dropzone from "react-dropzone"
import { useApi } from "../../../hooks/useApi"
import { useImages } from "../../../hooks/useImages"

interface ImageContainerProps {
    image: Image
}

export const ImageContainer: React.FC<ImageContainerProps> = ({ image }) => {
    const [hover, setHover] = useState(false)

    const api = useApi()
    const { updateImage } = useImages()

    const upload_icon_style: SxProps = {
        width: "30%",
        height: "auto",
    }

    const fileHandler = (file: File) => {
        console.log(file)
        const formData = new FormData()
        const data = { name: image.name, id: image.id }

        formData.append("data", JSON.stringify(data))
        formData.append("file", file)

        api.images.update({
            data: formData,
            callback: (response: { data: Image }) => {
                updateImage(response.data)
            },
        })
    }

    return (
        <div className="ImageContainer-Component" style={{ width: "50%" }}>
            <div className="container">
                <p>{image.title}</p>
                <Dropzone onDrop={(acceptedFiles) => fileHandler(acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                        <div
                            {...getRootProps()}
                            className="image-container"
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            <input {...getInputProps()} />
                            <img src={image.src + "?" + Date.now()} alt={image.title} />
                            <div className="icon-container" style={{ opacity: hover ? 1 : 0 }}>
                                <FileUploadIcon sx={upload_icon_style} />
                            </div>
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    )
}
