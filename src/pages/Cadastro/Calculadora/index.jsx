import { MenuItem } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../components/InputField';
import { useClient } from '../../../hooks/useClient';
import { useCurrencyMask } from '../../../hooks/useCurrencyMask';
import { usePercentMask } from '../../../hooks/usePercentMask';
import './style.scss';
import COLORS from '../../../sass/_colors.scss'

export const Calculadora = () => {

    const Flags = () => {
        const onSubmit = values => {
            // if (!client.value.anexos) {
            //     setFileError(true)
            //     return
            // }
            client.setValue({...client.value, flag: values.flag})
            navigate('/cadastro/calculadora')
        }

        return (
            <Formik initialValues={{flag: 0}} onSubmit={onSubmit} innerRef={flagRef} >
                {({values, handleChange}) => (
                    <Form>
                        <InputField select id='flag' title='Bandeira' handleChange={handleChange} value={values.flag} not_required >
                            <MenuItem
                                value={0}
                                style={{width: '100%'}}
                            >Sem bandeira</MenuItem>
                            <MenuItem
                                value={1}
                                style={{width: '100%'}}
                            >Verde</MenuItem>
                        </InputField>
                    </Form>
                )}
            </Formik>
        )
    }

    const client = useClient()
    const navigate = useNavigate()
    const flagRef = useRef(null)
    const percentMask = usePercentMask()
    const currencyMask = useCurrencyMask()

    const [spent, setSpent] = useState(client.value.form?.monthly_spent || 'R$ 1.000')
    const [discount, setDiscount] = useState('')
    const [new_spent, setNew_spent] = useState('')
    const [profit, setProfit] = useState('')
    const [cost, setCost] = useState('')

    const goBack = () => {
        navigate('/cadastro/anexos')
    }

    const nextStage = () => {
        navigate('/cadastro/contrato')
    }

    useEffect(() => {
        const spent_number = parseFloat(spent.replace(/(R\$\s*)|(\.)/g, "").replace(",", "."))
        const discount_number = parseFloat(discount.replace(/(%\s*)|(\.)/g, "").replace(",", "."))
        
        const new_spent_number = spent_number - (spent_number * (discount_number / 100))
        const new_spent_string = new_spent_number.toString().replace('.', ',')
        
        setNew_spent(new_spent_string)
    }, [spent, discount])

    useEffect(() => {
        const spent_number = parseFloat(spent.replace(/(R\$\s*)|(\.)/g, "").replace(",", "."))
        const discount_number = parseFloat(discount.replace(/(%\s*)|(\.)/g, "").replace(",", "."))
        
        const new_spent_number = spent_number * (discount_number / 100)
        const profit_number = parseFloat(profit.replace(/(%\s*)|(\.)/g, "").replace(",", "."))

        const cost_number = new_spent_number * (profit_number / 100)
        const cost_string = cost_number.toString().replace('.', ',')
        
        setCost(cost_string)
    }, [profit, new_spent])
    
    return (
        <div className='Calculadora-Component' >
            <h1>Calculadora de economia</h1>
            <Flags />
            <InputField title={'Gasto Mensal'} id={'spent'} value={spent} readOnly not_required />
            <InputField mask={percentMask} title={'Desconto'} id={'discount'} value={discount} handleChange={event => setDiscount(event.target.value)} />
            <InputField mask={currencyMask} title={'Novo valor da fatura'} id={'new_spent'} value={new_spent || 0} readOnly not_required />
            <InputField mask={percentMask} title={'Taxa sion'} id={'profit'} value={profit} handleChange={event => setProfit(event.target.value)} />
            <InputField mask={currencyMask} title={'Custo mensal'} id={'cost'} value={cost || 0} readOnly not_required />

            <div className="buttons-container">
                <button onClick={() => goBack()} style={{backgroundColor: COLORS.gray}} >Voltar</button>
                <button onClick={() => nextStage()}>Avançar</button>
            </div>
        </div>
    )
}