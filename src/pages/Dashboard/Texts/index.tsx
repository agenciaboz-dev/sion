import React, { useState, useEffect } from "react"
import "./style.scss"
import { useApi } from "../../../hooks/useApi"
import { Texts as TextsType } from "../../../definitions/texts"
import { User } from "../../../definitions/user"
import { useIndexedList } from "../../../hooks/useIndexedList"
import { SxProps, TextField } from "@mui/material"
import { Form, Formik } from "formik"

interface TextsProps {
    user: User
}

interface FormValues extends Array<TextsType> {}

export const Texts: React.FC<TextsProps> = ({ user }) => {
    const api = useApi()
    const { newArray } = useIndexedList()
    const sections = newArray(7)
    const [texts, setTexts] = useState<TextsType[]>([])

    const initialValues = texts

    const textfield_style: SxProps = {
        width: "49%",
    }

    const handleSubmit = (values: any) => {
        console.log(values)
    }

    useEffect(() => {
        console.log(initialValues)
    }, [initialValues])

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
