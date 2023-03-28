import { CustomDashedBorder } from 'custom-dashed-border';
import { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useAttachments } from '../../../../hooks/useAttachments';
import { useClient } from '../../../../hooks/useClient';
import {ReactComponent as DropIcon} from '../../../../images/dropzone.svg'
import { ReactComponent as UploadedIcon } from '../../../../images/dropzone_done.svg'
import COLORS from '../../../../sass/_colors.scss'
import { UploadedContainer } from '../UploadedContainer';

export const UploadContainer = ({ title, identifier }) => {
    const vw = window.innerHeight / 100

    const [attachments, setAttachments] = useAttachments()
    const client = useClient()

    const [fileError, setFileError] = useState(false)
    const [currentAttachments, setCurrentAttachments] = useState([])

    const borderStyle = {
        stripe: 2 * vw, 
        spacing: 2 * vw
    }

    const onDrop = useCallback((acceptedFiles) => {
        setCurrentAttachments([...acceptedFiles])

      }, [])


    useEffect(() => {
        console.log({currentAttachments})
        setAttachments({...attachments, [identifier]: currentAttachments})

    }, [currentAttachments])
    
    return (
        <>{ currentAttachments.length ? 
            <UploadedContainer files={currentAttachments} setCurrentAttachments={setCurrentAttachments} identifier={identifier} />
            :
            <div className='UploadContainer-Component' >
                <h1>{title}</h1>
                <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()} className="dropzone">
                            <CustomDashedBorder top={borderStyle} left={borderStyle} right={borderStyle} bottom={borderStyle} >
                                <input {...getInputProps()} />
                                <div className="upload-container">
                                    <DropIcon />
                                    <p style={{fontWeight: 'bold', color: fileError && COLORS.red}}>Clique para tirar uma foto</p>
                                    <p>ou selecione um arquivo</p>
                                </div> 

                            </CustomDashedBorder>
                        </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        }</>
    )
}