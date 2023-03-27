import { MenuItem } from "@mui/material"
import { Form, Formik } from "formik"
import { useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { InputField } from "../../../../components/InputField"
import { useClient } from "../../../../hooks/useClient"
import { useSuppliers } from "../../../../hooks/useSuppliers"

export const CurrentSupplier = ({ formRef }) => {
    const [unitError, setUnitError] = useState(false)

    const client = useClient()
    const navigate = useNavigate()
    const suppliers = useSuppliers()

    const unitInputRef = useRef(null)

    const onSubmit = values => {
        setUnitError(false)

        
        if (!values.unit) {
            setUnitError(true)
            unitInputRef.current.focus()
            return
        }

        client.setValue({...client.value, supplier: values.supplier, unit: values.unit})
        navigate('/cadastro/pessoa')
    }

    return (
        <Formik initialValues={{supplier: suppliers[0].name, unit: client?.value?.unit || ''}} onSubmit={onSubmit} innerRef={formRef} >
            {({values, handleChange}) => (
                <Form>
                    <InputField select id='supplier' title='Distribuidora atual' handleChange={handleChange} value={values.supplier} >
                        {suppliers.map(supplier => <MenuItem key={supplier.id}
                            value={supplier.name}
                            style={{width: '100%'}}
                        >{supplier.name}</MenuItem>)}
                    </InputField>
                    <InputField title='Unidade consumidora' id={'unit'} handleChange={handleChange} value={values.unit} error={unitError} errorText={'Campo obrigatório'} innerRef={unitInputRef} />

                </Form>
            )}
        </Formik>
    )
}