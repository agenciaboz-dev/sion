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
import { useContract } from '../../../../../hooks/useContract';
import { useValidateCPF } from '../../../../../hooks/useValidateCPF';

export const RepresentanteLegal = ({ handleChange, values, errors }) => {

    const default_errors = useValidationErrors()
    const client = useClient()
    const contract = useContract()
    const navigate = useNavigate()
    const validateCPF = useValidateCPF()

    const [cpfError, setCpfError] = useState(false)
    
    const [emails, setEmails] = useState([1])
    const [initialInputs, setInitialInputs] = useState(
        client.value?.name
            ? client.value
            : {
                  name: "",
                  cpf: "",
                  email1: "",
                  birth: "",
                  phone: "",
              }
    )

    const validationSchema = object({
        name: string().required(default_errors.required),
        // email: string().email(default_errors.email).required(default_errors.required),
        cpf: string().length(14, default_errors.cpf).required(default_errors.required),
        phone: string().min(14, default_errors.phone).required(default_errors.required),

        // age: number().typeError(default_errors.number).required(default_errors.required).positive().integer(),
        // email: string().email(default_errors.email),
        // website: string().url().nullable(),
        // createdOn: date().default(() => new Date()),
      });

    const nextStage = (values) => {
        client.setValue({...client.value, ...values, emails: emails.map(number => values[`email${number}`])})
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

    const cpfBlur = event => {
        setCpfError(!validateCPF(event.target.value))
    }

    useEffect(() => {
        console.log({emails})
    }, [emails])

    return (
        <Formik initialValues={initialInputs} onSubmit={(values) => nextStage(values)} validationSchema={validationSchema} enableReinitialize>
            {({ handleChange, values, submitForm, errors }) => (
                <Form
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault()
                            submitForm()
                        }
                    }}
                >
                    <InputField
                        title={"Nome do Responsável Legal"}
                        id={"name"}
                        handleChange={handleChange}
                        value={values.name}
                        error={Boolean(errors.name)}
                        errorText={errors.name}
                    />
                    <InputField
                        title={"CPF"}
                        onBlur={cpfBlur}
                        mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                        inputMode={"numeric"}
                        id={"cpf"}
                        handleChange={handleChange}
                        value={values.cpf}
                        error={cpfError}
                        errorText={"CPF inválido"}
                    />
                    <InputField
                        title={"Data de nascimento"}
                        id={"birth"}
                        handleChange={handleChange}
                        inputMode={"numeric"}
                        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                        value={values.birth}
                        error={errors.birth}
                        errorText={"Data inválida"}
                    />
                    <InputField
                        title={"Telefone"}
                        inputMode={"tel"}
                        mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                        id={"phone"}
                        handleChange={handleChange}
                        value={values.phone}
                        error={Boolean(errors.phone)}
                        errorText={errors.phone}
                    />

                    {emails.map((index) => (
                        <div className="email-container" key={index} style={{ alignItems: "center", justifyContent: "center", gap: "3vw" }}>
                            <InputField
                                title={"E-mail do Representante legal"}
                                type="email"
                                inputMode={"email"}
                                id={`email${index}`}
                                handleChange={handleChange}
                                value={values[`email${index}`]}
                                error={Boolean(errors[`email${index}`])}
                                errorText={errors[`email${index}`]}
                            />
                            {index > 1 && <DeleteForeverIcon onClick={() => removeEmail(index)} sx={{ color: COLORS.primary }} />}
                        </div>
                    ))}
                    {/* <DashedPlusBox onClick={addEmailContainer} /> */}

                    <div className="buttons-container">
                        <button tabIndex={2} onClick={(event) => previousStage(event)} style={{ backgroundColor: COLORS.gray }}>
                            Voltar
                        </button>
                        <button tabIndex={1} type="submit">
                            Avançar
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}