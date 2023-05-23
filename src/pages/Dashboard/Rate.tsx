import Button from '@mui/material/Button';
import React from 'react';
import './style.scss';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import { useApi } from '../../hooks/useApi';
import { useSettings } from '../../hooks/useSettings';
import { Settings } from '../../definitions/settings';

interface RateProps {}

interface FormValues {
    rate: number
}

export const Rate:React.FC<RateProps> = ({}) => {

    const initialValues:FormValues = { rate: 0 }
    const api = useApi()

    const settings = useSettings()

    const saveRate = (values: FormValues) => {
        api.settings.rate({
            data: values, 
            callback: (response:{data:Settings}) => {
                settings.setSettings(response.data)
            }
        })
    }
    
    return (
        <div className="Rate-Component" >
          
            <Formik initialValues={initialValues} onSubmit = {saveRate}>
                {({values, handleChange})=>(
                    <Form>
                        <p className="title">Tarifa de Energia</p> 
                        <TextField label= "" placeholder= "Tarifa de energia em %" name="rate" value={values.rate} onChange={handleChange} fullWidth/>
                    </Form>
                )}
            </Formik>
            <Button  type= "submit" variant="contained">Salvar</Button>
        </div>
    )
}