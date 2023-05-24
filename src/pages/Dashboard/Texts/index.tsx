import React, { useState, useEffect } from "react"
import "./style.scss"
import { useApi } from "../../../hooks/useApi"
import { Texts as TextsType } from "../../../definitions/texts"
import { User } from "../../../definitions/user"
import { useIndexedList } from "../../../hooks/useIndexedList"
import { Button, SxProps, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import { useConfirmDialog } from "../../../hooks/useConfirmDialog"

interface TextsProps {
    user: User
}

interface FormValues extends Array<TextsType> {}

export const Texts: React.FC<TextsProps> = ({ user }) => {
    const api = useApi()
    const { newArray } = useIndexedList()
    const sections = newArray(7)
    const { confirm } = useConfirmDialog()

    const [texts, setTexts] = useState<TextsType[]>([])
    const initialValues = texts

    const textfield_style: SxProps = {
        width: "49%",
    }

    const button_style: SxProps = {
        position: "fixed",
        bottom: "2vw",
        right: "8.5vw",
        zIndex: 2,
        fontSize: "1.7vw",
    }

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
        api.texts({
            callback: (response: { data: TextsType[] }) => {
                setTexts(response.data)
            },
        })
    }, [])

    return (
        <div className="Texts-Component">
            <Formik
                enableReinitialize
                initialValues={initialValues.reduce((object: any, value, index) => {
                    object[value.id] = value.text
                    return object
                }, {})}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <Button sx={button_style} variant="contained" type="submit">
                            Salvar
                        </Button>
                        {sections.map((section) => (
                            <div key={section} className="section-container">
                                <p>Seção {section}</p>
                                <div className="texts-container">
                                    {texts
                                        .filter((text) => text.section == section)
                                        .map((text) => (
                                            <TextField
                                                key={text.id}
                                                label={text.id}
                                                name={text.id.toString()}
                                                value={values[text.id]}
                                                onChange={handleChange}
                                                sx={textfield_style}
                                            />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </Form>
                )}
            </Formik>
        </div>
    )
}
