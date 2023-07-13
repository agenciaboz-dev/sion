import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useApi } from "../../../hooks/useApi"
import { LogContainer } from "./LogContainer"

interface LogsProps {}

export const Logs: React.FC<LogsProps> = ({}) => {
    const api = useApi()

    const [logs, setLogs] = useState<Log[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.logs({
            callback: (response: { data: Log[] }) => setLogs(response.data),
            finallyCallback: () => setLoading(false),
        })
    }, [])

    return loading ? (
        <Box sx={{}}></Box>
    ) : (
        <Box sx={{ gap: "0" }}>
            {logs
                .sort((a, b) => b.id - a.id)
                .map((log) => (
                    <Box key={log.id} sx={{ flexDirection: "column", boxShadow: "none!important", gap: "2vw", fontSize: "0.8vw" }}>
                        <LogContainer log={log} />
                        <hr />
                    </Box>
                ))}
        </Box>
    )
}
