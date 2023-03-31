import { createContext, useState } from 'react';

const StageContext = createContext({});

export default StageContext;


export const StageProvider = ({children}) => {
    const [value, setValue] = useState(1)
    const [bar, setBar] = useState(0)

    return (
        <StageContext.Provider value={{value, setValue, bar, setBar}}>
            {children}
        </StageContext.Provider>
    )
}