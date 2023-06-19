import React from "react"
import "./style.scss"
import { useNavigate } from "react-router-dom"
import { User } from "../../definitions/user"
import { useSidebarMenu } from "../../hooks/useSidebarMenu"
import LogoutIcon from "@mui/icons-material/Logout"
import { IconButton } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { useLocation } from "react-router-dom"

interface SidebarProps {
    user: User
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
    const navigate = useNavigate()
    const menus = useSidebarMenu()
    const { logout } = useUser()
    const pathname = useLocation().pathname

    return (
        <div className="Sidebar-Component">
            <p className="title">{user.adm ? "Administrativo" : "Vendedor"}</p>
            <div className="list">
                {menus
                    .filter((menu) => (menu.adm ? user.adm && menu : menu))
                    .map((menu) => (
                        <IconButton
                            edge="start"
                            key={menu.id}
                            onClick={() => navigate(menu.location)}
                            sx={{
                                alignSelf: "flex-start",
                                color: "white",
                                transition: "0.1s",
                                gap: "0.5vw",
                                "&:hover": { transform: "scale(1.1)" },
                            }}
                        >
                            {menu.location == pathname && ">"}
                            <p className="link">{menu.name}</p>
                        </IconButton>
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