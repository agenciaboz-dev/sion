import React from "react"
import "./style.scss"
import { Texts } from "../../../definitions/texts"
import { useApi } from "../../../hooks/useApi"
import { useConfirmDialog } from "../../../hooks/useConfirmDialog"
import { IconButton, SxProps, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"

interface TextContainerProps {
    text: Texts
}

export const TextContainer: React.FC<TextContainerProps> = ({ text }) => {
    const api = useApi()
    const { confirm } = useConfirmDialog()
    const button_style: SxProps = { width: "3vw", height: "3vw" }

    const handleSubmit = (values: Texts) => {
        confirm({
            title: "Salvar Textos",
            content: "Certeza que deseja aplicar esses textos?",
            onConfirm: () => {
                console.log(values)
            },
        })
    }

    return (
        <Formik initialValues={text} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
                <Form>
                    <TextField label={values.id} name={"text"} value={values.text} onChange={handleChange} fullWidth />
                    <IconButton type="submit" color="primary" sx={button_style}>
                        {text.text == values.text ? <CheckCircleOutlineIcon /> : <CheckCircleIcon />}
                    </IconButton>
                </Form>
            )}
        </Formik>
    )
}
