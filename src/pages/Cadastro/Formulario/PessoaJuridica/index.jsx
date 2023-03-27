import { object, string, number, date, InferType, setLocale } from 'yup';
import { Form, Formik } from 'formik';
import { useValidationErrors } from '../../../../hooks/useValidationsErrors';
import { InputField } from '../../../../components/InputField';
import { useCurrencyMask } from '../../../../hooks/useCurrencyMask';
import COLORS from '../../../../sass/_colors.scss'
import { useClient } from '../../../../hooks/useClient';

export const PessoaJuridica = ({ previousStage, nextStage }) => {
    const default_errors = useValidationErrors()
    const currencyMask = useCurrencyMask()
    const client = useClient()

    const initial_inputs = client.value?.form ||  {
        company: '',
        cnpj: '',
        category: '',
        address: '',
        cep: '',
    }

    const validationSchema = object({
        company: string().required(default_errors.required),
        cnpj: string().length(18, default_errors.cnpj).required(default_errors.required),
        category: string().required(default_errors.required),
        address: string().required(default_errors.required),
        cep: string().length(10, default_errors.cep).required(default_errors.required),

        // age: number().typeError(default_errors.number).required(default_errors.required).positive().integer(),
        // email: string().email(default_errors.email),
        // website: string().url().nullable(),
        // createdOn: date().default(() => new Date()),
      });

    return (
        <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values)} validationSchema={validationSchema}>
            {({handleChange, values, submitForm, errors}) => (
                <Form onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        submitForm();
                    }
                    }}>
                    <InputField title={'Razão Social'} id={'company'} handleChange={handleChange} value={values.company} error={Boolean(errors.company)} errorText={errors.company} />
                    <InputField title={'CNPJ'} mask={[/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/]} inputMode={'numeric'} id={'cnpj'} handleChange={handleChange} value={values.cnpj} error={Boolean(errors.cnpj)} errorText={errors.cnpj} />
                    <InputField title={'Ramo de atividade'} id={'category'} handleChange={handleChange} value={values.category} error={Boolean(errors.category)} errorText={errors.category} />
                    <InputField title={'Endereço da unidade consumidora'} id={'address'} handleChange={handleChange} value={values.address} error={Boolean(errors.address)} errorText={errors.address} />
                    <InputField title={'CEP'} inputMode={'numeric'} mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} id={'cep'} handleChange={handleChange} value={values.cep} error={Boolean(errors.cep)} errorText={errors.cep} />

                    <div className="buttons-container">
                        <button tabIndex={2} onClick={(event) => previousStage(event)} style={{backgroundColor: COLORS.gray}}>Voltar</button>
                        <button tabIndex={1} type="submit">Avançar</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}