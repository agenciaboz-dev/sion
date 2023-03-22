import { useContext } from 'react'
import AttachmentsContext from '../contexts/attachmentsContext'

export const useAttachments = () => {
    const attachmentsContext = useContext(AttachmentsContext);

    return [attachmentsContext.value, attachmentsContext.setValue]
}