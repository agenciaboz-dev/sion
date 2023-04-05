import { BackgroundContainer } from '../../components/BackgroundContainer';
import { Formik, Form } from 'formik'
import { TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import './style.scss';
import { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { ReactComponent as CameraIcon } from '../../images/camera.svg'
import { api } from '../../api';
import { useDocumentMask } from '../../hooks/useDocumentMask';
import MaskedInput from 'react-text-mask';
import { useParams } from 'react-router-dom';

export const SignContract = () => {
    const [attachments, setAttachments] = useState([])
    const [loading, setLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [error, setError] = useState('')

    const params = useParams()

    const documentMask = useDocumentMask()

    const initialValues = {
        name: '',
        document: '',
        birth: new Date().toISOString().substring(0, 10)
    }

    const handleSubmit = values => {
        setLoading(true)
        const formData = new FormData();
        const data = { ...values, id: params.id };
        console.log(params)
        console.log({data})

        formData.append("data", JSON.stringify(data));

        // Assuming you have the files in the `attachments` state
        if (attachments[0]) {
            attachments.map(file => {
                formData.append('biometria', file)
            })
        } else {
            setOpenSnackbar(true)
            setError('Foto obrigatória')
            setLoading(false)
            return
        }

        api.post('/contract/confirm', formData)
        .then(response => {
            const contract = response.data
            if (!contract) {
                setOpenSnackbar(true)
                setError('Dados inválidos')
            }
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }

    const onDrop = (acceptedFiles) => {
        setAttachments(acceptedFiles)
    }

    useEffect(() => {
        console.log(attachments)
    }, [attachments])
    
    return (
        <>
        <BackgroundContainer vendas>
            <div className='SignContract-Page' >
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({values, handleChange}) => 
                        <Form>
                            <h3>Confirme seus dados</h3>
                            <TextField label='Responsável Legal' name='name' value={values.name} onChange={handleChange} fullWidth required />
                            <MaskedInput
                                mask={documentMask}
                                name={'document'}
                                onChange={handleChange}
                                value={values.document}
                                guide={false}
                                render={(ref, props) => (
                                    <TextField
                                    inputRef={ref}
                                    {...props}
                                    label='CPF / CNPJ'
                                    inputProps={{inputMode: 'numeric'}} 
                                    fullWidth
                                    required
                                    />
                                )}
                            />
                            <TextField label='Data de nascimento' name='birth' value={values.birth} onChange={handleChange} type='date' fullWidth required />

                            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                    <div {...getRootProps()} className="dropzone">
                                        <input {...getInputProps()} />
                                        {attachments[0] ? 
                                        <div className="uploaded-container">
                                            <h3>{attachments[0].name}</h3>
                                        </div>
                                        :
                                        <div className="upload-container">
                                            <CameraIcon />
                                            <h3>Clique aqui para tirar uma foto</h3>
                                        </div> 
                                        }
                                    </div>
                                    </section>
                                )}
                            </Dropzone>
                            <Button variant='contained' type='submit' >{loading ? <CircularProgress size={'1.5rem'} color='secondary' /> : 'Avançar'}</Button>
                        </Form>
                    }
                </Formik>
            </div>
        </BackgroundContainer>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={() => setOpenSnackbar(false)} severity={'error'} sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>

        </>
    )
}