import React, { useEffect } from "react"
import "./style.scss"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Route, Routes } from "react-router-dom"
import { Contracts } from "./Contracts"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/")
    }, [])
    return user ? (
        <div className="Dashboard-Component">
            <Sidebar user={user} />
            <div className="content-container">
                <Routes>
                    <Route index element={<Contracts />} />
                </Routes>
            </div>
        </div>
    ) : (
        <></>
    )
}
