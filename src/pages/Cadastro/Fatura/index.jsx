import { MenuItem } from '@mui/material';
import { CustomDashedBorder } from 'custom-dashed-border';
import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../components/InputField';
import { MuiLoading } from '../../../components/MuiLoading';
import { useClient } from '../../../hooks/useClient';
import {ReactComponent as DropIcon} from '../../../images/dropzone.svg'
import { ReactComponent as UploadedIcon } from '../../../images/dropzone_done.svg'
import './style.scss';
import COLORS from '../../../sass/_colors.scss'

export const Fatura = ({ setProgressBarStage, setStage }) => {

    const CurrentSupplier = () => {
        const onSubmit = values => {
            setFileError(false)

            if (!fileContent) {
                setFileError(true)
                return
            }
            client.setValue({...client.value, supplier: values.supplier})
            navigate('/cadastro/contrato')
        }

        return (
            <Formik initialValues={{supplier: 0}} onSubmit={onSubmit} innerRef={formRef} >
                {({values, handleChange}) => (
                    <Form>
                        <InputField select id='supplier' title='Distribuidora atual' handleChange={handleChange} value={values.supplier} >
                            <MenuItem
                                value={0}
                                style={{width: '100%'}}
                            >Copel</MenuItem>
                        </InputField>
                    </Form>
                )}
            </Formik>
        )
    }

    const formRef = useRef(null)
    const vw = window.innerHeight / 100

    const navigate = useNavigate()
    const client = useClient()

    const [fileContent, setFileContent] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileError, setFileError] = useState(false)


    const borderStyle = {
        stripe: 2 * vw, 
        spacing: 2 * vw
    }

    const goBack = () => {
        setStage(0)
        navigate(-1)
    }

    const nextStage = () => {
        formRef.current.submitForm()
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
            <CurrentSupplier />
            <h1>Anexar o contrato social</h1>
            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()} className="dropzone">
                    <CustomDashedBorder top={borderStyle} left={borderStyle} right={borderStyle} bottom={borderStyle} >
                        <input {...getInputProps()} />
                        <div className="upload-container">
                            {fileContent ? <UploadedIcon /> : <DropIcon />}
                            {fileContent && <p style={{fontWeight: 'bold'}} >Feito!</p> }
                            {fileContent ? <p>Clique para selecionar outro arquivo</p> : <p style={{fontWeight: 'bold', color: fileError && COLORS.red}}>Selecione um arquivo para fazer upload</p>}
                            <p>ou arraste e solte aqui</p>
                        </div> 

                    </CustomDashedBorder>
                </div>
                </section>
            )}
            </Dropzone>
            <div className="buttons-container">
                <button onClick={() => goBack()} style={{backgroundColor: COLORS.gray}} >Voltar</button>
                <button onClick={() => nextStage()}>Avançar</button>
            </div>
        </div>
    )
}