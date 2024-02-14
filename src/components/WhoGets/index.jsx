import React, { useEffect, useState } from "react"
import { Avatar, Box, useMediaQuery } from "@mui/material"
import useMeasure from "react-use-measure"
import axios from "axios"
import Slider from "react-slick"
import "./style.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

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

    const settings = {
        dots: false,
        infinite: true,
        speed: isMobile ? 2000 * customerImages.length : 3000 * customerImages.length,
        slidesToShow: customerImages.length,
        slidesToScroll: customerImages.length,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        variableWidth: true,
        arrows: true,
        pauseOnHover: false,
    }

    return (
        <div className="WhoGets-Component" ref={ref}>
            <h2>Quem recebe nossa energia</h2>
            <div className="blue-background"></div>
            <div className="white-background"></div>

            <div className="main-container">
                <Slider {...settings}>
                    {customerImages.map((url, index) => (
                        <Box
                            key={index}
                            sx={{
                                padding: isMobile ? "5vw" : "2vw",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex !important",
                                width: isMobile ? "60% !important" : "25% !important",
                            }}
                        >
                            <img
                                src={url}
                                alt={`Customer ${index}`}
                                style={{
                                    width: isMobile ? "60vw" : "15vw",
                                    height: "auto",
                                    boxShadow: "0 0.5vw 1vw #00000040",
                                }}
                            />
                        </Box>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
