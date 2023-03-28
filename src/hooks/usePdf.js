import { useContext } from 'react'
import PdfContext from '../contexts/pdfContext'

export const usePdf = () => {
    const pdfContext = useContext(PdfContext);

    return [pdfContext.value, pdfContext.setValue]
}