import { useContext } from "react"
import SettingsContext from "../contexts/settingsContext"

export const useSettings = () => {
    const settingsContext = useContext(SettingsContext)

    const settings = settingsContext.value
    const rates = { green: settings.greenFlagRate, yellow: settings.yellowFlagRate, red: settings.redFlagRate, red2: settings.red2FlagRate }

    return { rates, setSettings: settingsContext.setValue }
}
