import { createContext, useEffect, useState } from "react"
import { api2 } from "../api"

const TextsContext = createContext({})

export default TextsContext

export const TextsProvider = ({ children }) => {
    const [advert, setAdvert] = useState([])
    const [howWorks, setHowWorks] = useState([])
    const [simulator, setSimulator] = useState([])
    const [faq, setFaq] = useState([])
    const [contact, setContact] = useState([])
    const [about, setAbout] = useState([])
    const [footer, setFooter] = useState([])
    const [whoGets, setWhoGets] = useState([])

    useEffect(() => {
        api2.get("texts").then((response) => {
            const texts = response.data
            setAdvert(texts.filter((text) => text.section == 1))
            setHowWorks(texts.filter((text) => text.section == 2))
            setSimulator(texts.filter((text) => text.section == 3))
            setFaq(texts.filter((text) => text.section == 4))
            setAbout(texts.filter((text) => text.section == 5))
            setFooter(texts.filter((text) => text.section == 6))
            setContact(texts.filter((text) => text.section == 7))
            setWhoGets(texts.filter((text) => text.section == 8))
        })
    }, [])

    return <TextsContext.Provider value={{ advert, howWorks, simulator, faq, contact, about, footer, whoGets }}>{children}</TextsContext.Provider>
}
