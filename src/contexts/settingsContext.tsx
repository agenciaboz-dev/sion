import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"

interface SettingsContextValue {
    value: Settings
    setValue: (value: Settings) => void
}

interface SettingsProviderProps {
    children: React.ReactNode
}

const SettingsContext = createContext<SettingsContextValue>({} as SettingsContextValue)

export default SettingsContext

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Settings>({ greenFlagRate: 0, yellowFlagRate: 0, redFlagRate: 0, red2FlagRate: 0 })

    const api = useApi()

    useEffect(() => {
        api.settings.get({ callback: (response: { data: Settings }) => setValue(response.data) })
    }, [])

    return <SettingsContext.Provider value={{ value, setValue }}>{children}</SettingsContext.Provider>
}
