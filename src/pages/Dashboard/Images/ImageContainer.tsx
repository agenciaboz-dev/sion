import React, { useState } from "react"
import { Image } from "../../../definitions/images"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import { SxProps } from "@mui/material"

interface ImageContainerProps {
    image: Image
}

export const ImageContainer: React.FC<ImageContainerProps> = ({ image }) => {
    const [hover, setHover] = useState(false)

    const upload_icon_style: SxProps = {
        width: "30%",
        height: "auto",
    }

    return (
        <div className="ImageContainer-Component">
            <div className="container">
                <p>Capa</p>
                <div className="image-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <img src={image.src} alt={image.name} />
                    <div className="icon-container" style={{ opacity: hover ? 1 : 0 }}>
                        <FileUploadIcon sx={upload_icon_style} />
                    </div>
                </div>
            </div>
        </div>
    )
}
