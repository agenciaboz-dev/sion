import React, { useEffect } from "react"
import "./style.scss"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/")
    }, [])
    return user ? <div className="Dashboard-Component"></div> : <></>
}
