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
import { useFlags } from '../../../hooks/useFlags';
import { NavButtons } from '../NavButtons';

export const Calculadora = ({ setProgressBarStage, setStage }) => {

    const client = useClient()
    const navigate = useNavigate()
    const discountRef = useRef(null)
    const profitRef = useRef(null)
    const percentMask = usePercentMask()
    const currencyMask = useCurrencyMask()
    const flags = useFlags()

    const [spent, setSpent] = useState(client.value?.form?.monthly_spent || 'R$ 1.000')
    const [currentFlag, setCurrentFlag] = useState(1)
    const [newFlag, setNewFlag] = useState(1)
    const [discount, setDiscount] = useState(client.value?.discount || '')
    const [new_spent, setNew_spent] = useState('')
    const [profit, setProfit] = useState(client.value?.profit || '')
    const [cost, setCost] = useState('')

    const goBack = () => {
        navigate('/cadastro/anexos')
    }

    const nextStage = () => {
        if (!discount) {
            discountRef.current.inputElement.focus()
            return
        }
        
        if (!profit) {
            profitRef.current.inputElement.focus()
            return
        }

        client.setValue({...client.value, discount, profit})
        navigate('/cadastro/contrato')
    }

    useEffect(() => {
        const spent_number = parseFloat(spent.replace(/(R\$\s*)|(\.)/g, "").replace(",", ".")) / currentFlag
        const discount_number = parseFloat(discount.replace(/(%\s*)|(\.)/g, "").replace(",", "."))
        const flagged_spent = spent_number * newFlag
        
        const new_spent_number = flagged_spent - (flagged_spent * (discount_number / 100))
        const new_spent_string = new_spent_number.toString().replace('.', ',')
        
        setNew_spent(new_spent_string)
    }, [spent, discount, currentFlag, newFlag])

    useEffect(() => {
        const spent_number = parseFloat(spent.replace(/(R\$\s*)|(\.)/g, "").replace(",", ".")) / currentFlag
        const discount_number = parseFloat(discount.replace(/(%\s*)|(\.)/g, "").replace(",", "."))
        const flagged_spent = spent_number * newFlag
        
        const new_spent_number = flagged_spent * (discount_number / 100)
        const profit_number = parseFloat(profit.replace(/(%\s*)|(\.)/g, "").replace(",", "."))

        const cost_number = new_spent_number * (profit_number / 100)
        const cost_string = cost_number.toString().replace('.', ',')
        
        setCost(cost_string)
    }, [profit, new_spent, currentFlag, newFlag])

    useEffect(() => {
        if (!client?.value?.unit) navigate('/cadastro/anexos')

        setProgressBarStage(100)
        setStage(2)
    }, [])
    
    return (
        <div className='Calculadora-Component' >
            <h1>Calculadora de economia</h1>
            <InputField select title='Bandeira' handleChange={event => setCurrentFlag(event.target.value)} value={currentFlag} not_required >
                {flags.map(flag => <MenuItem key={flag.factor} value={flag.factor} style={{width: '100%'}} >{flag.name}</MenuItem>)}
            </InputField>

            <InputField title={'Gasto Mensal'} id={'spent'} value={spent} readOnly not_required />

            <InputField select title='Projeção de bandeira' handleChange={event => setNewFlag(event.target.value)} value={newFlag} not_required >
                {flags.map(flag => <MenuItem key={flag.factor} value={flag.factor} style={{width: '100%'}} >{flag.name}</MenuItem>)}
            </InputField>

            <InputField mask={percentMask} title={'Desconto'} inputMode={'numeric'} innerRef={discountRef} id={'discount'} value={discount} handleChange={event => setDiscount(event.target.value)} />
            <InputField mask={currencyMask} title={'Novo valor da fatura'} id={'new_spent'} value={new_spent || 0} readOnly not_required />
            <InputField mask={percentMask} title={'Taxa sion'} inputMode={'numeric'} innerRef={profitRef} id={'profit'} value={profit} handleChange={event => setProfit(event.target.value)} />
            <InputField mask={currencyMask} title={'Custo mensal'} id={'cost'} value={cost || 0} readOnly not_required />

            <NavButtons goBack={goBack} nextStage={nextStage} />
        </div>
    )
}