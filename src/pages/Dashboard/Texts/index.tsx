import React, { useState, useEffect } from "react"
import "./style.scss"
import { useApi } from "../../../hooks/useApi"
import { Texts as TextsType } from "../../../definitions/texts"
import { User } from "../../../definitions/user"
import { useIndexedList } from "../../../hooks/useIndexedList"
import { Button, IconButton, SxProps, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import { useConfirmDialog } from "../../../hooks/useConfirmDialog"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import SaveIcon from "@mui/icons-material/Save"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"

interface TextsProps {
    user: User
}

interface TextContainer {
    text: TextsType
}

interface FormValues extends Array<TextsType> {}

export const Texts: React.FC<TextsProps> = ({ user }) => {
    const TextContainer: React.FC<TextContainer> = ({ text }) => {
        const handleSubmit = (values: TextsType) => {
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

    const api = useApi()
    const { newArray } = useIndexedList()
    const sections = newArray(7)
    const { confirm } = useConfirmDialog()

    const [texts, setTexts] = useState<TextsType[]>([])
    const initialValues = texts

    const textfield_style: SxProps = {
        width: "48%",
    }

    const button_style: SxProps = { width: "3vw", height: "3vw" }

    const handleSubmit = (values: any) => {
        confirm({
            title: "Salvar Textos",
            content: "Certeza que deseja aplicar esses textos?",
            onConfirm: () => {
                const keysArray = Object.keys(values)
                const data = keysArray.map((item) => ({ id: item, text: values[item], user_id: user.id }))
                console.log(data)
            },
        })
    }

    useEffect(() => {
        api.texts.get({
            callback: (response: { data: TextsType[] }) => {
                setTexts(response.data)
            },
        })
    }, [])

    return (
        <div className="Texts-Component">
            {sections.map((section) => (
                <div key={section} className="section-container">
                    <p>Seção {section}</p>
                    <div className="texts-container">
                        {texts
                            .filter((text) => text.section == section)
                            .map((text) => (
                                <TextContainer key={text.id} text={text} />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
