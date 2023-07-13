import React from "react"
import { Box, TextField } from "@mui/material"

interface LogContainerProps {
    log: Log
}

export const LogContainer: React.FC<LogContainerProps> = ({ log }) => {
    return (
        <Box sx={{ boxShadow: "none!important", flexDirection: "column" }}>
            {/* <TextField label={`${new Date(log.date).toLocaleString("pt-br")} - ${log.user.username}`} variant="standard" value={log.text} fullWidth /> */}
            <p>
                {new Date(log.date).toLocaleString("pt-br")} - {log.user.username}
            </p>
            <p style={{ fontSize: "1.2vw" }}>{log.text}</p>
        </Box>
    )
}
