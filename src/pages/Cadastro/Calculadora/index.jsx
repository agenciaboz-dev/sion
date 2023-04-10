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
import CurrencyFormat from 'react-currency-format';

export const Calculadora = ({  }) => {

    const Flag = ({ flag }) => {
        const Icon = () => flag.icon
        const [economy, setEconomy] = useState(0)

        useEffect(() => {
            setEconomy(consumption * flag.factor)
        }, [consumption])

        return (
            <div className="flag-container">
                <Icon />
                <hr />
                <h3 style={{fontWeight: 'normal'}}>Anual</h3>
                <CurrencyFormat
                    value={economy*12} 
                    displayType='text' 
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'R$ '}
                    style={{fontSize: '5vw', fontWeight: 'bold', color: COLORS.primary}}
                />
                <p>Mensal</p>
                <CurrencyFormat
                    value={economy} 
                    displayType='text' 
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'R$ '}
                    style={{color: COLORS.primary}}
                />

            </div>
        )
    }

    const client = useClient()
    const percentMask = usePercentMask()
    const kwhMask = useKWhMask()
    const flags = useFlags()

    const formRef = useRef(null)

    const [spent, setSpent] = useState(client.value?.spent || '0')
    const [consumption, setConsumption] = useState(0)

    const nextStage = () => {
        client.setValue({...client.value, spent})

        formRef.current.submitForm()
    }

    useEffect(() => {
        setConsumption(parseInt(spent.replace(/\D/, '')))
    }, [spent])

    return (
        <div className='Calculadora-Component' >
            <h1>Projeção de economia</h1>

            <CurrentSupplier formRef={formRef} />

            <InputField title={'Consumo mensal médio'} mask={kwhMask} id={'spent'} value={spent} handleChange={event => setSpent(event.target.value)} not_required />

            <div className="flags-container">
                {flags.map(flag => <Flag key={flag.id} flag={flag} />)}
            </div>

            <NavButtons nextOnly nextStage={nextStage} />
        </div>
    )
}