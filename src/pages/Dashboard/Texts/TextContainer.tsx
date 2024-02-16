import React, { useState } from "react"
import "./style.scss"
import { useApi } from "../../../hooks/useApi"
import { CircularProgress, IconButton, SxProps, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { useSnackbar } from "burgos-snackbar"
import { useConfirmDialog } from "burgos-confirm"

interface TextContainerProps {
    text: Text
    user: User
}

export const TextContainer: React.FC<TextContainerProps> = ({ text, user }) => {
    const api = useApi()
    const { confirm } = useConfirmDialog()
    const { snackbar } = useSnackbar()
    const button_style: SxProps = { width: "3vw", height: "3vw" }

    const [currentText, setCurrentText] = useState(text)
    const [loading, setLoading] = useState(false)

    const initialValues = currentText

    const handleSubmit = (values: Text) => {
        if (values.text == currentText.text) return
        if (loading) return

        confirm({
            title: "Salvar Texto",
            content: "Tem certeza de que deseja aplicar esse texto?",
            button: "Salvar",
            onConfirm: () => {
                setLoading(true)
                api.texts.update({
                    data: { ...values, date: new Date(), user },
                    callback: (response: { data: Text }) => {
                        setCurrentText(response.data)
                        snackbar({
                            severity: "success",
                            text: "Texto atualizado.",
                        })
                    },
                    finallyCallback: () => setLoading(false),
                })
            },
        })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
            {({ values, handleChange }) => (
                <Form>
                    <p>{/* Editado por {text.user.name} em {new Date(text.date).toLocaleDateString()} */}</p>
                    <div className="textfield" style={{ width: "100%", alignItems: "center", gap: "1vw" }}>
                        <TextField
                            label={`Editado por ${currentText.user.name} em ${new Date(currentText.date).toLocaleString()}`}
                            name={"text"}
                            value={values.text}
                            onChange={handleChange}
                            fullWidth
                        />
                        {loading ? (
                            <IconButton color="primary" sx={button_style}>
                                <CircularProgress size={"1rem"} />
                            </IconButton>
                        ) : (
                            <IconButton type="submit" color="primary" sx={button_style}>
                                {currentText.text == values.text ? <CheckCircleOutlineIcon /> : <CheckCircleIcon />}
                            </IconButton>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    )
}
