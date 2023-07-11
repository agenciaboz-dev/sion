import React, { useState } from "react"
import { CircularProgress, SxProps, TextField } from "@mui/material"

interface SearchFieldProps {
    onChange: (value: string) => void
    loading?: boolean
    sx?: SxProps
    fullWidth?: boolean
}

export const SearchField: React.FC<SearchFieldProps> = ({ onChange, loading, sx, fullWidth }) => {
    const [value, setValue] = useState("")

    const handleChange = (event: React.ChangeEvent<any>) => {
        setValue(event.target.value)
        onChange(event.target.value.toLowerCase())
    }

    return (
        <TextField
            name="search"
            className="search"
            placeholder="Buscar"
            InputProps={{
                sx: { backgroundColor: "white" },
                endAdornment: loading ? <CircularProgress size={"1.5rem"} /> : <></>,
            }}
            onChange={handleChange}
            value={value}
            sx={sx}
            fullWidth={fullWidth}
        />
    )
}
