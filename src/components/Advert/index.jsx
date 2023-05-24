import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Skeleton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import "./style.scss"
import { ReactComponent as Checkmark } from "../../images/checkmark.svg"
import { ReactComponent as Arrow } from "../../images/thin_arrow_right.svg"
import { ReactComponent as LogoBranco } from "../../images/logo_branco.svg"
import { useTexts } from "../../hooks/useTexts"
import { useEffect, useState } from "react"

export const Advert = ({ innerRef }) => {
    const [textsLoading, setTextsLoading] = useState(true)

    const texts = useTexts().advert
    const { text } = useTexts()
    const navigate = useNavigate()
    const goToSignUp = () => {
        navigate("/cadastro")
    }

    useEffect(() => {
        if (texts.length > 0) setTextsLoading(false)
    }, [texts])

    return (
        <div className="Advert-Component" ref={innerRef}>
            <LogoBranco className="logo-branco" />
            <div className="left">
                {text({ text: <h1>{texts[0]?.text}</h1>, loading: textsLoading, height: "5vw" })}
                {text({ text: <h3>{texts[1]?.text}</h3>, loading: textsLoading, height: "5vw" })}
                {text({ text: <p>{texts[2]?.text}</p>, loading: textsLoading, height: "5vw" })}
            </div>
            <div className="right">
                <div className="blue-box">
                    {text({
                        text: <p className="be-part">{texts[3]?.text}</p>,
                        loading: textsLoading,
                        height: "3vw",
                        width: "22vw",
                    })}

                    <div className="blue-box-ad">
                        <Checkmark />
                        {text({
                            text: <p className="blue-box-ad-p">{texts[4]?.text}</p>,
                            loading: textsLoading,
                            height: "2vw",
                        })}
                    </div>
                    <div className="blue-box-ad">
                        <Checkmark />
                        {text({
                            text: <p className="blue-box-ad-p">{texts[5]?.text}</p>,
                            loading: textsLoading,
                            height: "2vw",
                        })}
                    </div>
                    <div className="blue-box-ad">
                        <Checkmark />
                        {text({
                            text: <p className="blue-box-ad-p">{texts[6]?.text}</p>,
                            loading: textsLoading,
                            height: "2vw",
                        })}
                    </div>
                    <div className="blue-box-ad">
                        <Checkmark />
                        {text({
                            text: <p className="blue-box-ad-p">{texts[7]?.text}</p>,
                            loading: textsLoading,
                            height: "2vw",
                        })}
                    </div>
                    <button className="blue-box-register-button" onClick={goToSignUp}>
                        Cadastre-se! <Arrow />
                    </button>
                </div>
            </div>
        </div>
    )
}