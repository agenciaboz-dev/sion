import { CustomDashedBorder } from 'custom-dashed-border';
import { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useClient } from '../../../../hooks/useClient';
import {ReactComponent as DropIcon} from '../../../../images/dropzone.svg'
import { ReactComponent as UploadedIcon } from '../../../../images/dropzone_done.svg'
import COLORS from '../../../../sass/_colors.scss'

export const UploadContainer = ({ title, identifier }) => {
    const vw = window.innerHeight / 100

    const client = useClient()

    const [fileContent, setFileContent] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileError, setFileError] = useState(false)

    const borderStyle = {
        stripe: 2 * vw, 
        spacing: 2 * vw
    }

    const onDrop = useCallback((acceptedFiles) => {
        client.setValue({...client.value, fatura: acceptedFiles})

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
                            {fileContent ? <UploadedIcon /> : <DropIcon />}
                            {fileContent && <p style={{fontWeight: 'bold'}} >Feito!</p> }
                            {fileContent ? <p>Clique para selecionar outro arquivo</p> : <p style={{fontWeight: 'bold', color: fileError && COLORS.red}}>Clique para tirar uma foto</p>}
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