import MaskedInput from 'react-text-mask';
import { useCallback, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { Benefits } from './Benefits';
import './style.scss';
import { createNumberMask } from 'text-mask-addons';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as SunIcon} from '../../images/simulator/sun.svg';
import {ReactComponent as DollarIcon} from '../../images/simulator/dollar.svg';
import {ReactComponent as WalletIcon} from '../../images/simulator/wallet.svg';
import { TextField } from '@mui/material';
import { useFlags } from '../../hooks/useFlags';
import CurrencyFormat from 'react-currency-format';
import COLORS from '../../sass/_colors.scss'

export const Simulator = () => {

    const Flag = ({ flag }) => {
        const Icon = () => flag.icon
        const [economy, setEconomy] = useState(0)

        useEffect(() => {
            setEconomy(consumption*flag.factor)
        }, [consumption])
        return (
            <div className="flag-container">
                <Icon />
                <hr />
                <h3>Anual</h3>
                <CurrencyFormat
                    value={economy*12} 
                    displayType='text' 
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'R$ '}
                    style={{fontSize: '1vw', fontWeight: 'bold', color: COLORS.primary}}
                />
                <hr />
                <p>Mensal</p>
                <CurrencyFormat
                    value={economy*12} 
                    displayType='text' 
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'R$ '}
                    style={{fontSize: '0.7vw', color: COLORS.primary}}
                />
            </div>
        )
    }

    const [spent, setSpent] = useState('2000')
    const [consumption, setConsumption] = useState(0)

    const navigate = useNavigate()
    const flags = useFlags()

    const kwhMask = createNumberMask({
        prefix: '',
        suffix: ' kWh',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        decimalLimit: 2,
        allowNegative: false,
        allowLeadingZeroes: false,
    })

    const goToSignUp = () => {
        window.scrollTo(0, 200);
        navigate('/cadastro')
    }

    useEffect(() => {
        setConsumption(parseInt(spent.replace(/\D/, '')))
    }, [spent])

    return (
        <div className='Simulator-Component' id='simulator' >
            <div className="white-container">
                <h1>Simule sua economia</h1>
                <MaskedInput 
                    mask={kwhMask}
                    value={spent} onChange={event => setSpent(event.target.value)}
                    render={(ref, props) => (
                        <TextField
                            inputRef={ref}
                            {...props}
                            label='Consumo mensal'
                            inputProps={{inputMode: 'numeric'}}
                        />
                    )}
                />
                <div className="flags-container">
                    {flags.map(flag => <Flag flag={flag} />)}
                </div>
            </div>
            <div className="blue-container">
                <h1>Seus benefícios:</h1>
                <div className="benefits-container">
                    <Benefits icon={() => <DollarIcon />} title={'Economia'} text='Receba seus créditos de energia e economize em até 15% na sua fatura' />
                    <Benefits icon={() => <WalletIcon />} title={'Sem investimento'} text='Sem necessidade de alteração física no seu negócio ou investimento' />
                    <Benefits icon={() => <SunIcon />} title={'Energia renovável'} text='Os créditos de energia são gerados por fontes renováveis' />
                </div>
                <button onClick={() => goToSignUp()} className='simulator-signup-button'>Quero economizar!</button>
            </div>
        </div>
    )
}