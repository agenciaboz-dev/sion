import Button from '@mui/material/Button';
import React, { useState } from 'react';
import './style.scss';
import TextField from '@mui/material/TextField';
import { Form, Formik, useFormikContext, withFormik } from 'formik';
import { useApi } from '../../hooks/useApi';
import { useSettings } from '../../hooks/useSettings';
import { Settings } from '../../definitions/settings';
import CircularProgress from '@mui/material/CircularProgress';

interface RateProps {}

interface FormValues {
    rate: number
}

export const Rate:React.FC<RateProps> = ({}) => {

    const api = useApi()
    const settings = useSettings()

    const initialValues:FormValues = settings
    
    const [infoLoading, setInfoLoading] = useState(false)

    const loading_props = {
        size: "1.5rem",
        sx: { color: "white" },
    }
    

    const saveRate = (values: FormValues) => {
        setInfoLoading(true)

        api.settings.rate({
            data: values, 
            callback: (response:{data:Settings}) => {
                settings.setSettings(response.data)
            },
            finallyCallback: () => setInfoLoading(false),
        })
    }
    
    return (
        <div className="Rate-Component" >
          
            <Formik initialValues={initialValues} onSubmit = {saveRate} enableReinitialize>
                {({values, handleChange})=>(
                    <Form>
                        <p className="title">Tarifa de Energia</p> 
                        <TextField label= "" placeholder= "Tarifa de energia em %" name="rate" value={values.rate} onChange={handleChange} fullWidth/>
                        <Button type='submit' variant="contained"> {infoLoading ? <CircularProgress {...loading_props} /> : "Salvar"}</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}