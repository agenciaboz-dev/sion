import React from "react"
import "./style.scss"
import { useUser } from "../../hooks/useUser"

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
    const { user } = useUser()
    console.log({ meu_usuario: user })

    return <div className="Profile-Component">blabla</div>
}
