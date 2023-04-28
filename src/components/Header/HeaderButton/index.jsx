import { useRef, useState } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { useLocation, useNavigate } from "react-router-dom";
import COLORS from '../../../sass/_colors.scss'

export const HeaderButton = ({ menu, alternative }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const ref = useRef(null)
    
    const [headerHovered, setHeaderHovered] = useState(false)

    const goToHome = (event) => {
        navigate('/')
    }

    const alternative_style_hovered = {
      //   backgroundColor: "white",
      color: "white",
    }

    return (
      <div
        className={`HeaderButton-Component ${headerHovered && alternative ? "alternative-header" : "header-before"}`}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        style={{ "--background-color": alternative ? COLORS.headerBackground : "white" }}
      >
        <AnchorLink
          ref={ref}
          href={"#" + menu.name}
          className="menu-title"
          style={
            location.pathname == "/"
              ? headerHovered
                ? alternative
                  ? alternative_style_hovered
                  : null
                : null
              : { display: "none" }
          }
        >
          {menu.title}
        </AnchorLink>

        <div
          href={"#" + menu.name}
          className="menu-title"
          onMouseEnter={() => setHeaderHovered(true)}
          onMouseLeave={() => setHeaderHovered(false)}
          style={
            location.pathname == "/"
              ? { display: "none" }
              : headerHovered
              ? alternative
                ? alternative_style_hovered
                : { color: COLORS.primary }
              : null
          }
          onClick={(event) => goToHome(event)}
        >
          {menu.title}
        </div>
      </div>
    )
}