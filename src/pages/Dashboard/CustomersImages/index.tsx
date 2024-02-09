import React, { useEffect, useState } from "react"
import { api } from "../../../api"
import { CustomerContainer } from "./CustomerContainer"
import { Button, Grid } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom"

interface CustomersImagesProps {}

export const CustomersImages: React.FC<CustomersImagesProps> = ({}) => {
    const [customers, setCustomers] = useState<Customer[]>([])
    const navigate = useNavigate()

    async function fetchCustomers() {
        try {
            const response = await api.get("/customers")
            setCustomers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    return (
        <div>
            <Grid container columns={4} spacing={2}>
                <Grid item xs={1}>
                    <Button fullWidth variant="outlined" sx={{ borderStyle: "dashed" }} onClick={() => navigate(`/dashboard/customer/new`)}>
                        <AddIcon sx={{ transform: "scale(3)" }} />
                    </Button>
                </Grid>
                {customers.map((customer) => (
                    <Grid item xs={1} key={customer.id}>
                        <CustomerContainer customer={customer} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
