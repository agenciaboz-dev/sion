import React from "react"
import "./style.scss"
import { useNavigate } from "react-router-dom"
import { User } from "../../definitions/user"
import { useSidebarMenu } from "../../hooks/useSidebarMenu"
import LogoutIcon from "@mui/icons-material/Logout"
import { IconButton } from "@mui/material"
import { useUser } from "../../hooks/useUser"

interface SidebarProps {
    user: User
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
    const navigate = useNavigate()
    const menus = useSidebarMenu()
    const { logout } = useUser()

    return (
        <div className="Sidebar-Component">
            <p className="title">{user.adm ? "Administrativo" : "Vendedor"}</p>
            <div className="list">
                {menus
                    .filter((menu) => (menu.adm ? user.adm && menu : menu))
                    .map((menu) => (
                        <p className="link" key={menu.id} onClick={() => navigate(menu.location)}>
                            {menu.name}
                        </p>
                    ))}
            </div>
            <IconButton
                sx={{ marginTop: "auto", color: "white", gap: "1vw", alignSelf: "flex-start", fontWeight: "normal" }}
                onClick={() => logout()}
            >
                <LogoutIcon />
                Sair
            </IconButton>
        </div>
    )
}
