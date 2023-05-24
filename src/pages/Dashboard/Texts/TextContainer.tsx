import React, { useState } from "react"
import "./style.scss"
import { Texts } from "../../../definitions/texts"
import { useApi } from "../../../hooks/useApi"
import { useConfirmDialog } from "../../../hooks/useConfirmDialog"
import { IconButton, SxProps, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { User } from "../../../definitions/user"

interface TextContainerProps {
    text: Texts
    user: User
}

export const TextContainer: React.FC<TextContainerProps> = ({ text, user }) => {
    const api = useApi()
    const { confirm } = useConfirmDialog()
    const button_style: SxProps = { width: "3vw", height: "3vw" }

    const [currentText, setCurrentText] = useState(text)

    const initialValues = currentText

    const handleSubmit = (values: Texts) => {
        confirm({
            title: "Salvar Texto",
            content: "Certeza que deseja aplicar esse texto",
            onConfirm: () => {
                api.texts.update({
                    data: { ...values, date: new Date(), user },
                    callback: (response: { data: Texts }) => setCurrentText(response.data),
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
                        <IconButton type="submit" color="primary" sx={button_style}>
                            {currentText.text == values.text ? <CheckCircleOutlineIcon /> : <CheckCircleIcon />}
                        </IconButton>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
