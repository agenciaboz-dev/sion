import React, { useState } from "react"
import { Avatar, Box, MenuItem, Skeleton, SxProps } from "@mui/material"
import { useApi } from "../../../hooks/useApi"
import { useNavigate } from "react-router-dom"

interface CustomerContainerProps {
    customer: Customer
}

export const CustomerContainer: React.FC<CustomerContainerProps> = ({ customer }) => {
    const [hover, setHover] = useState(false)
    const [loading, setLoading] = useState(true)

    const api = useApi()
    const navigate = useNavigate()

    const upload_icon_style: SxProps = {
        width: "30%",
        height: "auto",
        color: "white",
    }

    const skeleton_style = { width: "100%", height: "auto" }

    return (
        <MenuItem
            sx={{ flexDirection: "column", alignItems: "center", width: 1 }}
            onClick={() => navigate(`/dashboard/customer/${customer.id}`, { state: { customer } })}
        >
            <Avatar
                key={customer.id}
                src={customer.image}
                variant="rounded"
                sx={{
                    border: "1px dashed $primary-color",
                    width: "100%",
                    height: "auto",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                }}
            />
        </MenuItem>
    )
}
