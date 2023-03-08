import { CustomDashedBorder } from 'custom-dashed-border';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../../hooks/useClient';
import {ReactComponent as DropIcon} from '../../../images/dropzone.svg'
import './style.scss';

export const Fatura = ({ setProgressBarStage, setStage }) => {
    const vw = window.innerHeight / 100

    const navigate = useNavigate()
    const client = useClient()

    const [fileContent, setFileContent] = useState('')
    const [fileName, setFileName] = useState('')


    const borderStyle = {
        stripe: 2 * vw, 
        spacing: 2 * vw
    }

    const goBack = () => {
        setStage(0)
        navigate(-1)
    }

    const nextStage = () => {
        navigate('/cadastro/contrato')
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

    useEffect(() => {
        setProgressBarStage(68.3)
        setStage(1)

    }, [])
    
    return (
        <div className='Fatura-Component' >
            <h1>Anexar a fatura de energia</h1>
            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()} className="dropzone">
                    <CustomDashedBorder top={borderStyle} left={borderStyle} right={borderStyle} bottom={borderStyle} >
                        <input {...getInputProps()} />
                        {
                            fileContent 
                            ?
                            <div className="file-container">
                                <h3>{fileName}</h3>
                                <p>{fileContent}</p>
                            </div> 
                            :
                            <div className="upload-container">
                                <DropIcon />
                                <p>Selecione um arquivo para fazer upload</p>
                                <p>ou arraste e solte aqui</p>
                            </div>
                        }

                    </CustomDashedBorder>
                </div>
                </section>
            )}
            </Dropzone>
            <div className="buttons-container">
                <button onClick={() => goBack()}>Voltar</button>
                <button onClick={() => nextStage()}>Avançar</button>
            </div>
        </div>
    )
}