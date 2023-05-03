import { MenuItem, useMediaQuery } from "@mui/material"
import { Form, Formik } from "formik"
import { useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../../../api"
import { InputField } from "../../../../components/InputField"
import { MuiLoading } from "../../../../components/MuiLoading"
import { useClient } from "../../../../hooks/useClient"
import { useSuppliers } from "../../../../hooks/useSuppliers"
import { useUser } from "../../../../hooks/useUser"

export const CurrentSupplier = ({ formRef, setValidUnit }) => {
    const [unitError, setUnitError] = useState(false)
    const [unitErrorText, setUnitErrorText] = useState("")
    const [loading, setLoading] = useState(false)

    const client = useClient()
    const [user, setUser] = useUser()
    const navigate = useNavigate()
    const suppliers = useSuppliers()
    const isMobile = useMediaQuery("(orientation: portrait)")
    const unitInputRef = useRef(null)

    const onSubmit = (values) => {
        // setUnitError(false)
        setUnitErrorText("")

        if (!values.unit) {
            setUnitError(true)
            setUnitErrorText("Campo obrigatório")
            setValidUnit(false)
            unitInputRef.current.focus()
            return
        }

        if (unitError) {
            unitInputRef.current.focus()
            return
        }

        client.setValue({ ...client.value, supplier: values.supplier, unit: values.unit })
        navigate("/cadastro/pessoa")
    }

    const saveUnit = (event) => {
        if (!event.target.value) {
            setUnitError(true)
            setUnitErrorText("Campo obrigatório")
            setValidUnit(false)
            unitInputRef.current.focus()
            return
        }

        // setUnitError(false)
        setUnitErrorText("")
        setLoading(true)

        api.post("/contract/unit", { unit: event.target.value })
            .then((response) => {
                const error = response.data?.error
                if (error) {
                    setUnitError(true)
                    setUnitErrorText(error)
                    setValidUnit(false)
                    unitInputRef.current.focus()
                } else {
                    setUnitError(false)
                    setValidUnit(true)
                }
                console.log(response.data)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    return (
        <Formik
            initialValues={{ supplier: suppliers[0].name, unit: client?.value?.unit || "" }}
            onSubmit={onSubmit}
            innerRef={formRef}
        >
            {({ values, handleChange }) => (
                <Form>
                    <InputField
                        select
                        id="supplier"
                        title="Distribuidora atual"
                        handleChange={handleChange}
                        value={values.supplier}
                    >
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier.id} value={supplier.name} style={{ width: "100%" }}>
                                {supplier.name}
                            </MenuItem>
                        ))}
                    </InputField>
                    <div
                        className="unit-container"
                        style={{
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: isMobile ? "3vw" : "1vw",
                        }}
                    >
                        <InputField
                            title="Unidade consumidora"
                            id={"unit"}
                            handleChange={handleChange}
                            onBlur={saveUnit}
                            value={values.unit}
                            error={unitError}
                            errorText={unitErrorText}
                            innerRef={unitInputRef}
                        />
                        {loading && <MuiLoading color="primary" size={isMobile ? "5vw" : "2vw"} />}
                    </div>
                </Form>
            )}
        </Formik>
    )
}
