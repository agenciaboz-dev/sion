import { useCallback, useEffect, useRef, useState } from 'react';
import { InputField } from '../../../components/InputField';
import { useClient } from '../../../hooks/useClient';
import './style.scss';
import COLORS from '../../../sass/_colors.scss'
import { useFlags } from '../../../hooks/useFlags';
import { NavButtons } from '../NavButtons';
import { CurrentSupplier } from './CurrentSupplier';
import CurrencyFormat from 'react-currency-format';

export const Calculadora = ({  }) => {

    const Flag = ({ flag }) => {
        const Icon = () => flag.icon
        const [economy, setEconomy] = useState(0)

        useEffect(() => {
            setEconomy(consumption * flag.factor)
            console.log(consumption)
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
    const flags = useFlags()

    const formRef = useRef(null)

    const [spent, setSpent] = useState(client.value?.spent || '')
    const [consumption, setConsumption] = useState(0)

    const nextStage = () => {
        client.setValue({...client.value, spent})

        formRef.current.submitForm()
    }

    useEffect(() => {
        if (spent) {
            setConsumption(Number(spent.replace(/\D/, '')))
        } else {
            setConsumption(0)
        }
        
    }, [spent])

    return (
        <div className='Calculadora-Component' >
            <h1>Projeção de economia</h1>

            <CurrentSupplier formRef={formRef} />

            <InputField title={'Consumo mensal médio'} endAdornment={<p>kWh</p>} id={'spent'} value={spent} handleChange={event => setSpent(event.target.value)} not_required />

            <div className="flags-container">
                {flags.map(flag => <Flag key={flag.id} flag={flag} />)}
            </div>

            <NavButtons nextOnly nextStage={nextStage} />
        </div>
    )
}