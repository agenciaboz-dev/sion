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
import { useKWhMask } from '../../../hooks/useKWhMask';
import { CurrentSupplier } from './CurrentSupplier';

export const Calculadora = ({  }) => {

    const client = useClient()
    const navigate = useNavigate()
    const discountRef = useRef(null)
    const profitRef = useRef(null)
    const percentMask = usePercentMask()
    const currencyMask = useCurrencyMask()
    const kwhMask = useKWhMask()
    const flags = useFlags()

    const formRef = useRef(null)

    const [spent, setSpent] = useState(client.value?.spent || '2000')

    const nextStage = () => {
        client.setValue({...client.value, spent})

        formRef.current.submitForm()
    }

    useEffect(() => {
        
    }, [])
    
    return (
        <div className='Calculadora-Component' >
            <h1>Projeção de economia</h1>

            <CurrentSupplier formRef={formRef} />

            <InputField title={'Consumo mensal médio'} mask={kwhMask} id={'spent'} value={spent} handleChange={event => setSpent(event.target.value)} not_required />

            <NavButtons nextOnly nextStage={nextStage} />
        </div>
    )
}