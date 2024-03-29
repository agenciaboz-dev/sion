import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import useMeasure from "react-use-measure"
import axios from "axios"
import Slider from "react-slick"
import { useTexts } from "../../hooks/useTexts"
import "./style.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const WhoGets = () => {
    const isMobile = useMediaQuery("(max-width:600px)")
    const [ref, { height }] = useMeasure()
    const [customerImages, setCustomerImages] = useState([])
    const texts = useTexts().whoGets

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
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-in-out",
        variableWidth: true,
        arrows: false,
        pauseOnHover: false,
    }

    return (
        <div className="WhoGets-Component" ref={ref}>
            <h2>{texts[0]?.text}</h2>
            <div className="blue-background"></div>
            <div className="white-background"></div>

            <div className="main-container">
                <Slider {...settings}>
                    {customerImages.map((url, index) => (
                        <Box
                            key={index}
                            sx={{
                                padding: isMobile ? "10vw" : "2vw",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex !important",
                            }}
                        >
                            <img
                                src={url}
                                alt={`Customer ${index}`}
                                style={{
                                    width: isMobile ? "80vw" : "16vw",
                                    height: "auto",
                                    aspectRatio: "1/1",
                                    objectFit: "cover",
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
