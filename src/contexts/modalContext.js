import { createContext, useState } from "react";

const ModalContext = createContext({});

export default ModalContext;


export const ModalProvider = ({children}) => {
    const [value, setValue] = useState(false)

    return (
        <ModalContext.Provider value={{value, setValue}}>
            {children}
        </ModalContext.Provider>
    )
}