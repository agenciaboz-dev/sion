import "./style.scss"
import { useColors } from "../../hooks/useColors"

export const Footer = ({}) => {
    const colors = useColors()

    return (
        <div
            className="Footer-Component"
            style={{
                backgroundColor: "transparent",
                marginLeft: "-10vw",
                width: 0,
                height: 0,
                borderTop: "35vw solid transparent",
                borderBottom: "0 solid transparent",
                borderRight: `110vw solid ${colors.primary}`,
                padding: 0,
            }}
        ></div>
    )
}
