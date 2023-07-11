import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import './style.scss';
import {Form, Formik} from 'formik';
import Button from '@mui/material/Button';
import { useApi } from '../../hooks/useApi';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { useConfirmDialog } from 'burgos-confirm'
import { useSnackbar } from "burgos-snackbar"
import { User } from '../../definitions/user';
import { Navigate, useNavigate } from 'react-router-dom';
import MaskedInput from "react-text-mask"
import { useCepMask, useCpfMask, usePhoneMask } from "burgos-masks"

interface NewSellerProps {}

interface FormValues {
    name: string
    rg: string
    cpf: string
    birth: Date
    email: string
    phone: string
    username: string
    password: string
    adress: string
    number: string
    cep: string
    district: string
}

export const NewSeller: React.FC<NewSellerProps> = ({}) => {
    const api = useApi()
    const [infoLoading, setInfoLoading] = useState(false)
    const { confirm } = useConfirmDialog()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()
    const cpfMask = useCpfMask
    const phoneMask = usePhoneMask()
    const cepMask = useCepMask()

    const loading_props = {
        size: "1.5rem",
        sx: { color: "white" },
    }

    const initialValues = {
        name: "",
        rg: "",
        cpf: "",
        birth: new Date(),
        email: "",
        phone: "",
        username: "",
        password: "",
        adress: "",
        number: "",
        cep: "",
        district: "",
    }

    const handleInfoSubmit = (values: FormValues) => {
        setInfoLoading(true)
        console.log(values)

        confirm({
            title: "Salvar",
            content: "Salvar novo vendedor?",
            onConfirm: () => {
                api.user.new({
                    data: values,
                    callback: (response: { data: User }) => {
                        const user = response.data
                        snackbar({ severity: "success", text: "Vendedor cadastrado" })
                        navigate(`/dashboard/seller/${user.id}`)
                    },
                    finallyCallback: () => setInfoLoading(false),
                })
            },
        })
    }

    return (
        <div className="NewSeller-Component">
            <Formik initialValues={initialValues} onSubmit={handleInfoSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <div className="form">
                            <div className="infoSellers" style={{ gap: "1vw" }}>
                                <p className="data">Dados Pessoais</p>
                                <TextField name="name" label="Nome completo" value={values.name} onChange={handleChange} />
                                <TextField
                                    name="rg"
                                    label="RG"
                                    placeholder="0000000000"
                                    value={values.rg}
                                    onChange={handleChange}
                                />
                                <MaskedInput
                                    mask={cpfMask}
                                    guide={false}
                                    name="cpf"
                                    value={values.cpf}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField inputRef={ref} {...props} label="CPF" placeholder="000.000.000-00" />
                                    )}
                                />
                                <TextField
                                    name="birth"
                                    type="date"
                                    label="Data de Nascimento"
                                    placeholder="dd/mm/aa"
                                    value={values.birth}
                                    onChange={handleChange}
                                />
                                <MaskedInput
                                    mask={phoneMask}
                                    guide={false}
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            label="Telefone"
                                            placeholder="(41) 9 9999-9999"
                                        />
                                    )}
                                />
                            </div>

                            <div className="infoComplement">
                                <TextField
                                    name="email"
                                    label="E-mail"
                                    placeholder="seu@email.com"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {/* <p className="title">Biometria Facial</p>
                                <p className="subtitle">Foto do rosto do vendedor</p>
                                <div className="biometry">Upload de arquivo </div> */}
                                <div className="two-inputs">
                                    <TextField
                                        name="username"
                                        sx={{ width: "50%" }}
                                        label="Login"
                                        placeholder="Login"
                                        value={values.username}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        name="password"
                                        sx={{ width: "50%" }}
                                        label="Senha"
                                        placeholder="Senha"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="two-inputs">
                                    <TextField
                                        name="adress"
                                        sx={{ width: "50%" }}
                                        label="Endereço Residencial"
                                        placeholder="Rua Exemplo"
                                        value={values.adress}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        name="number"
                                        sx={{ width: "50%" }}
                                        label="Número"
                                        placeholder="123"
                                        value={values.number}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="two-inputs">
                                    <MaskedInput
                                        mask={cepMask}
                                        guide={false}
                                        name="cep"
                                        style={{ width: "50%" }}
                                        value={values.cep}
                                        onChange={handleChange}
                                        render={(ref, props) => (
                                            <TextField inputRef={ref} {...props} label="CEP" placeholder="00.000-000" />
                                        )}
                                    />
                                    <TextField
                                        name="district"
                                        sx={{ width: "50%" }}
                                        label="Bairro"
                                        placeholder="Exemplo"
                                        value={values.district}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="info-container">
                            <div className="info">
                                <p className="title">Comprovante de Residência</p>
                                <p className="subtitle">Foto do arquivo de um comprovante de residência do vendedor</p>
                                <div className="biometry">Upload de arquivo</div>
                            </div>
                            <div className="info right">
                                <p className="title">Fotos dos Documentos</p>
                                <p className="subtitle">Fotos frente-verso do RG, CPF</p>
                                <div className="biometry">Upload de arquivo </div>
                            </div>
                        </div>
                        <div className="others">
                            <p className="title">Outros Documentos</p>
                            <p className="subtitle">
                                Outros documentos específicos, como carteira de trabalho, título de eleitor ou carteira de
                                trabalho
                            </p>
                            <div className="biometry"> Upload de arquivo </div>
                        </div> */}
                        <Button type="submit" variant="contained">
                            {" "}
                            {infoLoading ? <CircularProgress {...loading_props} /> : "Cadastrar Vendedor"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}