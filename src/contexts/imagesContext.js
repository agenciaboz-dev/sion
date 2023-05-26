import { useEffect } from "react"
import { createContext, useState } from "react"
import { api2 } from "../api"

const ImagesContext = createContext({})

export default ImagesContext

export const ImagesProvider = ({ children }) => {
    const [value, setValue] = useState([])

    useEffect(() => {
        console.log(value)
    }, [value])

    useEffect(() => {
        api2.get("/images").then((response) =>
            setValue(
                response.data.map((image) => ({
                    ...image,
                    src: `${api2.getUri().split("/api")[0]}/static/${image.src}`,
                }))
            )
        )
    }, [])

    return <ImagesContext.Provider value={{ value, setValue }}>{children}</ImagesContext.Provider>
}
