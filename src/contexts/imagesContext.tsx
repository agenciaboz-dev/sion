import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"

interface ImagesContextValue {
    value: Image[]
    setValue: (value: Image[]) => void
}

interface ImagesProviderProps {
    children: React.ReactNode
}

const ImagesContext = createContext<ImagesContextValue>({} as ImagesContextValue)

export default ImagesContext

export const ImagesProvider: React.FC<ImagesProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Image[]>([])

    const api = useApi()

    useEffect(() => {
        api.images.get({
            callback: (response: { data: Image[] }) =>
                setValue(
                    response.data.map((image) => ({ ...image, src: `${api.url.split("/api")[0]}/static/${image.src}` }))
                ),
        })
    }, [])

    return <ImagesContext.Provider value={{ value, setValue }}>{children}</ImagesContext.Provider>
}
