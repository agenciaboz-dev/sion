import React, { useEffect } from "react"
import "./style.scss"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Route, Routes, useLocation } from "react-router-dom"
import { Contracts } from "./Contracts"
import { Contract } from "./Contract"
import { Profile } from "./Profile"
import { Rate } from "./Rate"
import { NewSeller } from "./NewSeller"
import { Sellers } from "./Sellers"
import { Seller } from "./Seller"
import { Texts } from "./Texts"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { user } = useUser()
    const navigate = useNavigate()
    const pathname = useLocation().pathname

    useEffect(() => {
        if (!user) navigate("/")
        if (pathname == "/dashboard") navigate("/dashboard/contracts")
    }, [pathname])

    return user ? (
        <div className="Dashboard-Component">
            <Sidebar user={user} />
            <div className="content-container">
                <Routes>
                    <Route index element={<Contracts />} />
                    <Route path="contracts/" element={<Contracts />} />
                    <Route path="contract/:id" element={<Contract />} />
                    <Route path="profile/" element={<Profile user={user} />} />
                    <Route path="rate/" element={<Rate />} />
                    <Route path="sellers/" element={<Sellers />} />
                    <Route path="seller/:id" element={<Seller />} />
                    <Route path="new_seller/" element={<NewSeller />} />
                    <Route path="texts/" element={<Texts user={user} />} />
                </Routes>
            </div>
        </div>
    ) : (
        <></>
    )
}
