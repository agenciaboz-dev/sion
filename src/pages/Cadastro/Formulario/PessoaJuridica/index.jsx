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
        name: '',
        cnpj: '',
        category: '',
        curriculum: '',
        email: '',
        phone: '',
        address: '',
        number: '',
        district: '',
        monthly_spent: '',
    }

    const validationSchema = object({
        company: string().required(default_errors.required),
        name: string().required(default_errors.required),
        cnpj: string().length(18, default_errors.cnpj).required(default_errors.required),
        category: string().required(default_errors.required),
        curriculum: string().required(default_errors.required),
        email: string().email(default_errors.email).required(default_errors.required),
        phone: string().min(14, default_errors.phone).required(default_errors.required),
        address: string().required(default_errors.required),
        number: number().typeError(default_errors.number).required(default_errors.required),
        district: string().required(default_errors.required),
        monthly_spent: string().required(default_errors.required),

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
                    <InputField title={'Razão Social titular da Unidade Consumidora'} id={'company'} handleChange={handleChange} value={values.company} error={Boolean(errors.company)} errorText={errors.company} />
                    <InputField title={'Nome do Responsável Legal'} id={'name'} handleChange={handleChange} value={values.name} error={Boolean(errors.name)} errorText={errors.name} />
                    <InputField title={'CNPJ'} mask={[/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/]} id={'cnpj'} handleChange={handleChange} value={values.cnpj} error={Boolean(errors.cnpj)} errorText={errors.cnpj} />
                    <InputField title={'Objeto Social'} id={'category'} handleChange={handleChange} value={values.category} error={Boolean(errors.category)} errorText={errors.category} />
                    <InputField title={'Curriculo Social'} id={'curriculum'} handleChange={handleChange} value={values.curriculum} error={Boolean(errors.curriculum)} errorText={errors.curriculum} />
                    <InputField title={'E-mail dos Representantes legais para assinatura'} id={'email'} handleChange={handleChange} value={values.email} error={Boolean(errors.email)} errorText={errors.email} />
                    <InputField title={'Telefone'} mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} id={'phone'} handleChange={handleChange} value={values.phone} error={Boolean(errors.phone)} errorText={errors.phone} />
                    <InputField title={'Endereço'} id={'address'} handleChange={handleChange} value={values.address} error={Boolean(errors.address)} errorText={errors.address} />
                    <InputField title={'Número'} id={'number'} handleChange={handleChange} value={values.number} error={Boolean(errors.number)} errorText={errors.number} />
                    <InputField title={'Bairro'} id={'district'} handleChange={handleChange} value={values.district} error={Boolean(errors.district)} errorText={errors.district} />
                    <InputField title={'Gasto mensal em média'} mask={currencyMask} id={'monthly_spent'} handleChange={handleChange} value={values.monthly_spent} error={Boolean(errors.monthly_spent)} errorText={errors.monthly_spent} />
                    <div className="buttons-container">
                        <button tabIndex={2} onClick={(event) => previousStage(event)} style={{backgroundColor: COLORS.gray}}>Voltar</button>
                        <button tabIndex={1} type="submit">Avançar</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}