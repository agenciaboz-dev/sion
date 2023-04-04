import { BackgroundContainer } from '../../components/BackgroundContainer';
import { Formik, Form } from 'formik'
import { TextField, Button } from '@mui/material';
import './style.scss';
import { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { ReactComponent as CameraIcon } from '../../images/camera.svg'
import { api } from '../../api';

export const SignContract = () => {
    const [attachments, setAttachments] = useState([])

    const initialValues = {
        name: '',
        document: '',
        birth: new Date().toISOString().substring(0, 10)
    }

    const handleSubmit = values => {
        const formData = new FormData();
        const data = { ...values };

        formData.append("data", JSON.stringify(data));

        // Assuming you have the files in the `attachments` state
        if (attachments) {
            attachments.map(file => {
                formData.append('biometria', file)
            })
        }

        api.post('/contract/confirm', formData)
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    }

    const onDrop = (acceptedFiles) => {
        setAttachments(acceptedFiles)
    }

    useEffect(() => {
        console.log(attachments)
    }, [attachments])
    
    return (
        <BackgroundContainer vendas>
            <div className='SignContract-Page' >
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({values, handleChange}) => 
                        <Form>
                            <h3>Confirme seus dados</h3>
                            <TextField label='Responsável Legal' name='name' value={values.name} onChange={handleChange} fullWidth />
                            <TextField label='CPF / CNPJ' name='document' value={values.document} onChange={handleChange} inputProps={{inputMode: 'numeric'}} fullWidth />
                            <TextField label='Data de nascimento' name='birth' value={values.birth} onChange={handleChange} type='date' fullWidth />

                            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                    <div {...getRootProps()} className="dropzone">
                                        <input {...getInputProps()} />
                                        <div className="upload-container">
                                            <CameraIcon />
                                            <h3>Clique aqui para tirar uma foto</h3>
                                        </div> 
                                    </div>
                                    </section>
                                )}
                            </Dropzone>
                            <Button variant='contained' type='submit' >Avançar</Button>
                        </Form>
                    }
                </Formik>
            </div>
        </BackgroundContainer>
    )
}