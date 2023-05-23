import React from "react"
import "./style.scss"
import { Form, Formik } from "formik"
import { User } from "../../definitions/user"
import { TextField } from "@mui/material"

interface ProfileProps {
    user: User
}

interface FormValues extends User {}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const initialValues: FormValues = user

    const handleSubmit = (values: FormValues) => {
        console.log(values)
    }

    return (
        <div className="Profile-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField label="Nome de usuário" name="username" value={values.username} onChange={handleChange} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
