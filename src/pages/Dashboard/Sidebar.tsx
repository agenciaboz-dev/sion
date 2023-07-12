import React, { useState } from "react"
import "./style.scss"
import { useNavigate } from "react-router-dom"
import { useSidebarMenu } from "../../hooks/useSidebarMenu"
import LogoutIcon from "@mui/icons-material/Logout"
import { IconButton } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { useLocation } from "react-router-dom"
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined"
import ListAltIcon from "@mui/icons-material/ListAlt"

interface SidebarProps {
    user: User
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
    const navigate = useNavigate()
    const menus = useSidebarMenu()
    const { logout } = useUser()
    const pathname = useLocation().pathname
    
    const contractRegex = /^\/dashboard\/contract\/\d+$/

    const filteredMenus = menus.filter((menu) => {
        if (user.role == 2 && menu) {
            return menu.site
        } else if (user.role == 3 && menu) {
            return menu.seller
        } else if (user.role == 4 && menu) {
            return menu.adm
        } else if (user.role == 5 && menu) {
            return menu.operation
        } else if (user.role == 6 && menu) {
            return menu.commertial
        }
    })
    const [selectedMenu, setSelectedMenu] = useState<number | null>(filteredMenus.length > 0 ? filteredMenus[0].id : null)
    const [selectedSubmenu, setSelectedSubmenu] = useState<number | null>(
        filteredMenus.length > 0 && filteredMenus[0].submenu ? filteredMenus[0].submenu[0].id : null
    )
    const [showSubmenu, setShowSubmenu] = useState(filteredMenus.length > 0 && filteredMenus[0].submenu ? true : false)

    const handleMenuClick = (menu: SidebarMenu) => {
        if (selectedMenu === menu.id) {
            setSelectedMenu(null)
            setShowSubmenu(false)
        } else {
            setSelectedMenu(menu.id)
            setShowSubmenu(true)
        }
        setSelectedSubmenu(null)
    }

    const handleSubmenuClick = (submenu: SidebarMenu) => {
        if (selectedSubmenu === submenu.id) {
            setSelectedSubmenu(null)
        } else {
            setSelectedSubmenu(submenu.id)
        }

        navigate(submenu.location)
    }

    return (
        <div className="Sidebar-Component">
            <div className="list">
                {filteredMenus.map((menu) => (
                    <React.Fragment key={menu.id}>
                        <IconButton
                            edge="start"
                            onClick={() => handleMenuClick(menu)}
                            sx={{
                                alignSelf: "flex-start",
                                color: "white",
                                transition: "0.1s",
                                gap: "0.5vw",
                                "&:hover": { transform: "scale(1.1)" },
                            }}
                        >
                            {[pathname, contractRegex.test(menu.location)].includes(menu.location) && (
                                <ArrowForwardIosOutlinedIcon
                                    sx={{
                                        border: "0.15vw solid white",
                                        borderRadius: "50%",
                                        padding: "0.1vw",
                                        height: "1.2vw",
                                        width: "1.2vw",
                                    }}
                                />
                            )}
                            <p className={`link ${selectedMenu === menu.id ? "fontWeight: 600" : ""}`}>{menu.name}</p>
                        </IconButton>
                        {showSubmenu && selectedMenu === menu.id && menu.submenu && (
                            <ul className="submenu">
                                {menu.submenu.map((submenuItem) => (
                                    <li
                                        key={submenuItem.id}
                                        style={{ listStyle: "none" }}
                                        className={`SubmenuItem ${selectedSubmenu === submenuItem.id ? "selected" : ""}`}
                                    >
                                        <IconButton
                                            key={submenuItem.id}
                                            onClick={() => handleSubmenuClick(submenuItem)}
                                            sx={{
                                                alignSelf: "flex-start",
                                                color: "white",
                                                transition: "0.1s",
                                                gap: "0.5vw",
                                                "&:hover": { transform: "scale(1.1)" },
                                            }}
                                        >
                                            {[pathname, contractRegex.test(submenuItem.location)].includes(
                                                submenuItem.location
                                            ) && (
                                                <ArrowForwardIosOutlinedIcon
                                                    sx={{
                                                        border: "0.15vw solid white",
                                                        borderRadius: "50%",
                                                        padding: "0.1vw",
                                                        height: "1.2vw",
                                                        width: "1.2vw",
                                                    }}
                                                />
                                            )}
                                            <p className="submenu-link">{submenuItem.name}</p>
                                        </IconButton>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <IconButton
                sx={{
                    marginTop: "auto",
                    color: "white",
                    gap: "0.6vw",
                    alignSelf: "flex-start",
                    fontWeight: "normal",
                    fontSize: "1.3vw",
                }}
                onClick={() => (window.location.href = "https://controle.cooperativasion.com.br")}
            >
                <ListAltIcon sx={{ width: "2vw" }} />
                Controle
            </IconButton>
            <IconButton
                sx={{ color: "white", gap: "0.6vw", alignSelf: "flex-start", fontWeight: "normal", fontSize: "1.3vw" }}
                onClick={() => logout()}
            >
                <LogoutIcon sx={{ width: "2vw" }} />
                Sair
            </IconButton>
        </div>
    )
}
