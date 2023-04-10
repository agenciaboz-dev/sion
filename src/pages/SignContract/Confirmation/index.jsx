import { Button, CircularProgress, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import Dropzone from 'react-dropzone';
import { useParams } from 'react-router';
import MaskedInput from 'react-text-mask';
import { useDocumentMask } from '../../../hooks/useDocumentMask';
import { useEffect, useState } from 'react';
import { api } from '../../../api';
import { ReactComponent as CameraIcon } from '../../../images/camera.svg'
import { useUser } from '../../../hooks/useUser';

export const Confirmation = ({ setOpenSnackbar, setError, setStage, setContract }) => {
    const [attachments, setAttachments] = useState([])
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const [user, setUser] = useUser()

    const documentMask = useDocumentMask()

    const initialValues = {
        name: '',
        document: '',
        birth: new Date().toISOString().substring(0, 10)
    }

    const handleSubmit = values => {
        setLoading(true)
        const formData = new FormData();
        const data = { ...values, id: params.id, user };
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
            } else {
                setContract(contract)
                setStage(2)
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({values, handleChange}) => 
                <Form>
                    <h3>Confirme seus dados</h3>
                    <TextField label='Responsável Legal' name='name' value={values.name} onChange={handleChange} fullWidth required />
                    <MaskedInput
                        mask={[ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ]}
                        name={'document'}
                        onChange={handleChange}
                        value={values.document}
                        guide={false}
                        render={(ref, props) => (
                            <TextField
                            inputRef={ref}
                            {...props}
                            label='CPF'
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
    )
}