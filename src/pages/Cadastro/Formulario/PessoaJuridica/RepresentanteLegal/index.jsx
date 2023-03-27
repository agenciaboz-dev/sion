import { object, string, number, date, InferType, setLocale } from 'yup';
import { Form, Formik } from 'formik';
import { useValidationErrors } from '../../../../../hooks/useValidationsErrors';
import { InputField } from '../../../../../components/InputField';
import COLORS from '../../../../../sass/_colors.scss'
import { useClient } from '../../../../../hooks/useClient';
import { useNavigate } from 'react-router-dom';

export const RepresentanteLegal = ({ }) => {
    const default_errors = useValidationErrors()
    const client = useClient()
    const navigate = useNavigate()

    const initial_inputs = client.value?.form ||  {
        name: '',
        email: '',
        phone: '',
    }

    const validationSchema = object({
        name: string().required(default_errors.required),
        email: string().email(default_errors.email).required(default_errors.required),
        phone: string().min(14, default_errors.phone).required(default_errors.required),

        // age: number().typeError(default_errors.number).required(default_errors.required).positive().integer(),
        // email: string().email(default_errors.email),
        // website: string().url().nullable(),
        // createdOn: date().default(() => new Date()),
      });

    const nextStage = (values) => {
        client.setValue({...client.value, form: {...client.value.form, ...values}})
        navigate('/cadastro/anexos')
    }

    const previousStage = (event) => {
        event.preventDefault()
        navigate('/cadastro/formulario')
    }

    return (
        <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values)} validationSchema={validationSchema}>
            {({handleChange, values, submitForm, errors}) => (
                <Form onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        submitForm();
                    }
                    }}>
                    <InputField title={'Nome do Responsável Legal'} id={'name'} handleChange={handleChange} value={values.name} error={Boolean(errors.name)} errorText={errors.name} />
                    <InputField title={'E-mail do Representante legal'} type='email' inputMode={'email'} id={'email'} handleChange={handleChange} value={values.email} error={Boolean(errors.email)} errorText={errors.email} />
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