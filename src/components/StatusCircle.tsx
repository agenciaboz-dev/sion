import React from "react"
import { AlertColor, Box, Paper, SxProps } from "@mui/material"

interface StatusCircleProps {
    sx?: SxProps
    color: AlertColor
}

export const StatusCircle: React.FC<StatusCircleProps> = ({ sx, color }) => {
    const _sx: SxProps = {
        ...sx,
        width: "1vw",
        height: "1vw",
        borderRadius: "100%",
        backgroundColor: `${color}.main`,
    }

    return <Paper sx={_sx} />
}
