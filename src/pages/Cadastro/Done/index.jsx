import { Button, useMediaQuery } from "@mui/material"
import "./style.scss"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useNavigate } from "react-router-dom"

export const Done = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <div className="Done-Component" style={{ flexDirection: "column", gap: isMobile ? "5vw" : "1vw" }}>
            <CheckCircleIcon color="primary" sx={{ width: isMobile ? "15vw" : "5vw", height: "auto" }} />
            <h1>Seja bem-vindo à Sion Energia!</h1>
            <Button sx={{ fontSize: isMobile ? "5vw" : "2vw" }} variant="contained" onClick={() => navigate("/cadastro")}>
                Concluir
            </Button>
        </div>
    )
}
