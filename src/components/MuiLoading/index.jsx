import { CircularProgress } from "@mui/material"
import { useMediaQuery } from "react-responsive"

export const MuiLoading = ({ size, color }) => {

    const isMobile = useMediaQuery({maxWidth: 600})
    
    return (
        <section className="MuiLoading-Component">
            <CircularProgress size={size || (isMobile ? "4vw" : "1.5rem")} color={color || "secondary"} />
        </section>
    )
}