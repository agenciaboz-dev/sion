import React, { useState } from "react"
import { Image } from "../../../definitions/images"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import { SxProps, Skeleton } from "@mui/material"
import Dropzone from "react-dropzone"
import { useApi } from "../../../hooks/useApi"
import { useImages } from "../../../hooks/useImages"
import { useColors } from "../../../hooks/useColors"
import { useUser } from "../../../hooks/useUser"
import { useConfirmDialog } from "burgos-confirm"

interface ImageContainerProps {
    image: Image
}

export const ImageContainer: React.FC<ImageContainerProps> = ({ image }) => {
    const [hover, setHover] = useState(false)
    const [loading, setLoading] = useState(true)

    const api = useApi()
    const { updateImage } = useImages()
    const { user } = useUser()
    const { confirm } = useConfirmDialog()

    const upload_icon_style: SxProps = {
        width: "30%",
        height: "auto",
        color: "white",
    }

    const skeleton_style = { width: "100%", height: "15vw" }

    const fileHandler = (file: File) => {
        if (loading) return

        confirm({
            title: "Atualizar imagem",
            content: "Tem certeza que deseja alterar essa imagem?",
            onConfirm: () => {
                setLoading(true)
                const formData = new FormData()
                const data = { name: image.name, id: image.id, user, date: new Date() }

                formData.append("data", JSON.stringify(data))
                formData.append("file", file)

                api.images.update({
                    data: formData,
                    callback: (response: { data: Image }) => {
                        updateImage(response.data)
                    },
                })
            },
        })
    }

    return (
        <div className="ImageContainer-Component">
            <div className="container">
                <p>
                    {image.title} - {image.size} px
                </p>
                <Dropzone onDrop={(acceptedFiles) => fileHandler(acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                        <div
                            {...getRootProps()}
                            className="image-container"
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            <input {...getInputProps()} />
                            <img
                                onLoad={() => setLoading(false)}
                                src={image.src + "?" + Date.now()}
                                alt={image.title}
                                style={{ display: loading ? "none" : "" }}
                            />
                            {loading && <Skeleton variant="rectangular" sx={skeleton_style} />}
                            <div className="icon-container" style={{ opacity: hover ? 1 : 0 }}>
                                <FileUploadIcon sx={upload_icon_style} />
                            </div>
                        </div>
                    )}
                </Dropzone>
                <p style={{ fontSize: "0.9vw", textAlign: "end" }}>
                    Editado por {image.user.name} em {new Date(image.date).toLocaleString()}
                </p>
            </div>
        </div>
    )
}
