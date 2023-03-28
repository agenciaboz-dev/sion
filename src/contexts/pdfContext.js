import { createContext, useState } from 'react';

const PdfContext = createContext({});

export default PdfContext;


export const PdfProvider = ({children}) => {
    const [value, setValue] = useState()

    return (
        <PdfContext.Provider value={{value, setValue}}>
            {children}
        </PdfContext.Provider>
    )
}