import { useCallback, useEffect, useRef, useState } from 'react';
import { InputField } from '../../../components/InputField';
import { useClient } from '../../../hooks/useClient';
import './style.scss';
import COLORS from '../../../sass/_colors.scss'
import { useFlags } from '../../../hooks/useFlags';
import { NavButtons } from '../NavButtons';
import { CurrentSupplier } from './CurrentSupplier';
import CurrencyFormat from 'react-currency-format';
import { useUser } from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export const Calculadora = ({  }) => {

    const Flag = ({ flag }) => {
        const Icon = () => flag.icon
        const Tone = () => flag.name
        const [economy, setEconomy] = useState(0)

        useEffect(() => {
            setEconomy(consumption * flag.factor)
            console.log(consumption)
        }, [consumption])

        return (
            <div className="flag-container">
                <div className="flag-tone">
                    <Icon />
                    <Tone />
                </div>
                <hr />
                <div className="yearly">
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
                </div>
                <hr />
                <div className="monthly">
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

            </div>
        )
    }

    const client = useClient()
    const flags = useFlags()
    const [user, setUser] = useUser()
    const navigate = useNavigate()
    
    const formRef = useRef(null)
    
    const [validUnit, setValidUnit] = useState(false)
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

    useEffect(() => {
        if (!user) navigate('/login')
    }, [])

    return (
        <div className='Calculadora-Component' >
            <h1>Projeção de economia</h1>

            <CurrentSupplier formRef={formRef} setValidUnit={setValidUnit} />

            <InputField title={'Consumo mensal médio'} endAdornment={<p className='kwh'>kWh</p>} id={'spent'} value={spent} handleChange={event => setSpent(event.target.value)} not_required />

            <div className="flags-container">
                {flags.map(flag => <Flag key={flag.id} flag={flag} />)}
            </div>

            <NavButtons nextOnly nextStage={nextStage} disabledNext={!validUnit} />
        </div>
    )
}