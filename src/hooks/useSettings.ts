import { useContext } from "react"
import SettingsContext from "../contexts/settingsContext"

export const useSettings = () => {
    const settingsContext = useContext(SettingsContext)

    const settings = settingsContext.value
    const rate = settings.rate

    return { rate, setSettings: settingsContext.setValue }
}
