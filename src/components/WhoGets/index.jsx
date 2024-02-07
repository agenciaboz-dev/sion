import useMeasure from "react-use-measure"
import { Carousel } from "react-responsive-carousel"
import { Avatar, Box, useMediaQuery } from "@mui/material"
import "./style.scss"

const getImageUrl = (customerImage) => `/images/customers/${customerImage}.webp`

const customerImages = ["confiance", "toyota_sulpar", "elasto", "mcdonalds", "baraquias", "varandas", "dutra_ipiranga", "lojasmm"]

export const WhoGets = () => {
    const isMobile = useMediaQuery("(max-width:600px)")
    const [ref, { height }] = useMeasure()

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
                >
                    {customerImages.map((name, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                justifyContent: "center",
                                padding: "3vw",
                            }}
                        >
                            <Avatar
                                variant="rounded"
                                src={getImageUrl(name)}
                                style={{
                                    width: isMobile ? "60%" : "25%",
                                    height: "auto",
                                    aspectRatio: "1/1",
                                    borderRadius: "5vw",
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