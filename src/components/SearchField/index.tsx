import React from "react"
import { TextField } from "@mui/material"

interface SearchFieldProps {
    values: { search: string }
    onChange: (e: string | React.ChangeEvent<any>) => void
}

export const SearchField: React.FC<SearchFieldProps> = ({ onChange, values }) => {
    return (
        <TextField
            name="search"
            className="search"
            placeholder="Buscar"
            InputProps={{ sx: { backgroundColor: "white" } }}
            onChange={onChange}
            value={values.search}
        ></TextField>
    )
}
