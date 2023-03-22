import { CustomDashedBorder } from 'custom-dashed-border';
import { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useAttachments } from '../../../../hooks/useAttachments';
import { useClient } from '../../../../hooks/useClient';
import {ReactComponent as DropIcon} from '../../../../images/dropzone.svg'
import { ReactComponent as UploadedIcon } from '../../../../images/dropzone_done.svg'
import COLORS from '../../../../sass/_colors.scss'

export const UploadContainer = ({ title, identifier }) => {
    const vw = window.innerHeight / 100

    const [attachments, setAttachments] = useAttachments()
    const client = useClient()

    const [fileContent, setFileContent] = useState(attachments[identifier] || '')
    const [fileName, setFileName] = useState(attachments[identifier] || '')
    const [fileError, setFileError] = useState(false)
    const [currentAttachments, setCurrentAttachments] = useState(client.value.anexos[identifier])
    console.log({[identifier]: client.value.anexos[identifier]})

    const borderStyle = {
        stripe: 2 * vw, 
        spacing: 2 * vw
    }

    const onDrop = useCallback((acceptedFiles) => {
        setAttachments({...attachments, [identifier]: acceptedFiles})

        acceptedFiles.forEach((file) => {
          const reader = new FileReader()
          setFileName(file.name)
    
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
          // Do whatever you want with the file contents
            const binaryStr = reader.result
            console.log(binaryStr)
            setFileContent(binaryStr)
          }
          reader.readAsText(file);
        //   reader.readAsArrayBuffer(file)

        })
        
      }, [])

    useEffect(() => {
        setCurrentAttachments(client.value.anexos[identifier])
    }, [client.value.anexos[identifier]])
    
    return (
        <div className='UploadContainer-Component' >
            <h1>{title}</h1>
            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()} className="dropzone">
                    <CustomDashedBorder top={borderStyle} left={borderStyle} right={borderStyle} bottom={borderStyle} >
                        <input {...getInputProps()} />
                        <div className="upload-container">
                            {currentAttachments ? <UploadedIcon /> : <DropIcon />}
                            {currentAttachments && <p style={{fontWeight: 'bold'}} >Feito!</p> }
                            {currentAttachments ? <p>Clique para selecionar outro arquivo</p> : <p style={{fontWeight: 'bold', color: fileError && COLORS.red}}>Clique para tirar uma foto</p>}
                            <p>ou selecione um arquivo</p>
                        </div> 

                    </CustomDashedBorder>
                </div>
                </section>
            )}
            </Dropzone>
        </div>
    )
}