import { useContext } from "react"
import TextsContext from "../contexts/textsContext"
import { Skeleton } from "@mui/material"

export const useTexts = () => {
    const textsContext = useContext(TextsContext)

    const text = (options) => {
        return options.loading ? (
            <Skeleton
                variant="rectangular"
                sx={{
                    display: "flex",
                    width: options.width || "100%",
                    height: options.height || "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.11)",
                }}
            />
        ) : (
            options.text
        )
    }

    return { ...textsContext, text }
}
