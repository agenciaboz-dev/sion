import { object, string, number, date, InferType, setLocale } from 'yup';
import { Form, Formik } from 'formik';
import { useValidationErrors } from '../../../../../hooks/useValidationsErrors';
import { InputField } from '../../../../../components/InputField';
import COLORS from '../../../../../sass/_colors.scss'
import { useClient } from '../../../../../hooks/useClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DashedPlusBox } from '../../../../../components/DashedPlusBox';
import { useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const RepresentanteLegal = ({ handleChange, values, errors }) => {

    const default_errors = useValidationErrors()
    const client = useClient()
    const navigate = useNavigate()
    
    const [emails, setEmails] = useState([1])
    const [initialInputs, setInitialInputs] = useState(client.value?.form?.name ? client.value.form : {
        name: '',
        email1: '',
        phone: '',
    })

    const validationSchema = object({
        name: string().required(default_errors.required),
        // email: string().email(default_errors.email).required(default_errors.required),
        phone: string().min(14, default_errors.phone).required(default_errors.required),

        // age: number().typeError(default_errors.number).required(default_errors.required).positive().integer(),
        // email: string().email(default_errors.email),
        // website: string().url().nullable(),
        // createdOn: date().default(() => new Date()),
      });

    const nextStage = (values) => {
        client.setValue({...client.value, form: {...client.value.form, ...values}, emails: emails.map(number => values[`email${number}`])})
        navigate('/cadastro/anexos')
    }

    const previousStage = (event) => {
        event.preventDefault()
        navigate('/cadastro/formulario')
    }

    const addEmailContainer = () => {
        setEmails([...emails, emails[emails.length-1]+1])
        setInitialInputs({...initialInputs, [`email${emails.length+1}`]: ''})
    }

    const removeEmail = (current_number) => {
        if (current_number == 1) return
        setEmails(emails.filter(number => number != current_number))
    }

    useEffect(() => {
        console.log({emails})
    }, [emails])

    return (
        <Formik initialValues={initialInputs} onSubmit={values => nextStage(values)} validationSchema={validationSchema} enableReinitialize>
            {({handleChange, values, submitForm, errors}) => (
                <Form onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        submitForm();
                    }
                    }}>
                    <InputField title={'Nome do Responsável Legal'} id={'name'} handleChange={handleChange} value={values.name} error={Boolean(errors.name)} errorText={errors.name} />

                    {emails.map(index => <div className="email-container" key={index} style={{alignItems: 'center', justifyContent: 'center', gap: '3vw'}}>
                        <InputField title={'E-mail do Representante legal'} type='email' inputMode={'email'} id={`email${index}`} handleChange={handleChange} value={values[`email${index}`]} error={Boolean(errors[`email${index}`])} errorText={errors[`email${index}`]} />
                        <DeleteForeverIcon onClick={() => removeEmail(index)} sx={{color: COLORS.primary}} />
                    </div> )}
                    <DashedPlusBox onClick={addEmailContainer} />

                    <InputField title={'Telefone'} inputMode={'tel'} mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} id={'phone'} handleChange={handleChange} value={values.phone} error={Boolean(errors.phone)} errorText={errors.phone} />

                    <div className="buttons-container">
                        <button tabIndex={2} onClick={(event) => previousStage(event)} style={{backgroundColor: COLORS.gray}}>Voltar</button>
                        <button tabIndex={1} type="submit">Avançar</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}