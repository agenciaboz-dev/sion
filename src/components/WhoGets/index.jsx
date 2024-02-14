import useMeasure from "react-use-measure"
import { Carousel } from "react-responsive-carousel"
import { Avatar, Box, useMediaQuery } from "@mui/material"
import "./style.scss"
import axios from "axios"
import { useEffect, useState } from "react"

const getImageUrl = (customerImage) => `/images/customers/${customerImage}.webp`

export const WhoGets = () => {
    const isMobile = useMediaQuery("(max-width:600px)")
    const [ref, { height }] = useMeasure()
    const [customerImages, setCustomerImages] = useState([])

    async function fetchCustomerImages() {
        const images = (await axios.get("https://app.agenciaboz.com.br:4101/api/customers")).data.map((customer) => customer.image)
        setCustomerImages(images)
    }

    useEffect(() => {
        fetchCustomerImages()
    }, [])

    return (
        <div className="WhoGets-Component" ref={ref}>
            <h2>Quem recebe nossa energia</h2>
            <div className="blue-background"></div>
            <div className="white-background"></div>

            <div className="main-container">
                <Carousel
                    autoPlay
                    infiniteLoop
                    interval={3000}
                    transitionTime={1000}
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    width={"100vw"}
                    stopOnHover={false}
                >
                    {customerImages.map((url, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                justifyContent: "center",
                                padding: "3vw",
                            }}
                        >
                            <Avatar
                                variant="square"
                                src={url}
                                style={{
                                    width: isMobile ? "60%" : "25%",
                                    height: "auto",
                                    aspectRatio: "1/1",
                                    boxShadow: "0 0.5vw 1vw #00000040",
                                }}
                            />
                        </Box>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}