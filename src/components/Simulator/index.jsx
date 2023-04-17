import MaskedInput from 'react-text-mask';
import { useCallback, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { Benefits } from './Benefits';
import './style.scss';
import { createNumberMask } from 'text-mask-addons';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as EconomyIcon} from '../../images/wb_economy_icon.svg';
import {ReactComponent as NoInvestmentIcon} from '../../images/wb_no_investment_icon.svg';
import {ReactComponent as RenewableEnergyIcon} from '../../images/wb_renewable_energy_icon.svg';
import { TextField } from '@mui/material';
// import { useFlags } from '../../hooks/useFlags';
import CurrencyFormat from 'react-currency-format';
import COLORS from '../../sass/_colors.scss'

export const Simulator = () => {
    
    const Econ = () => {
        const [economy, setEconomy] = useState(0)

        useEffect(() => {
            setEconomy(consumption*0.1)
        }, [consumption])

        return (
            <div className="econ-container">
                <h3>Economize até:</h3>
                <div className="yearly-econ">
                    <h4>Anualmente</h4>
                    <CurrencyFormat
                        value={economy*12}
                        displayType='text'
                        thousandSeparator='.'
                        decimalSeparator=','
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={'R$ '}
                        style={{fontSize: '1.5vw', fontWeight: '500', color: COLORS.primary}}
                    />
                </div>
                <hr />
                <div className="monthly-econ">
                    <p>Mensalmente</p>
                    <CurrencyFormat
                        value={economy}
                        displayType='text'
                        thousandSeparator='.'
                        decimalSeparator=','
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={'R$ '}
                        style={{fontSize: '1vw', color: COLORS.lightText}}
                    />
                </div>
            </div>
        )
    } 

    // const Flag = ({ flag }) => {
    //     const Icon = () => flag.icon
    //     const [economy, setEconomy] = useState(0)

    //     useEffect(() => {
    //         setEconomy(consumption*flag.factor)
    //     }, [consumption])
    //     return (
    //         <div className="flag-container">
    //             <Icon />
    //             <hr />
    //             <h3>Anual</h3>
    //             <CurrencyFormat
    //                 value={economy*12} 
    //                 displayType='text' 
    //                 thousandSeparator='.'
    //                 decimalSeparator=','
    //                 decimalScale={2}
    //                 fixedDecimalScale={true}
    //                 prefix={'R$ '}
    //                 style={{fontSize: '1vw', fontWeight: 'bold', color: COLORS.primary}}
    //             />
    //             <hr />
    //             <p>Mensal</p>
    //             <CurrencyFormat
    //                 value={economy*12} 
    //                 displayType='text' 
    //                 thousandSeparator='.'
    //                 decimalSeparator=','
    //                 decimalScale={2}
    //                 fixedDecimalScale={true}
    //                 prefix={'R$ '}
    //                 style={{fontSize: '0.7vw', color: COLORS.primary}}
    //             />
    //         </div>
    //     )
    // }

    const [spent, setSpent] = useState('2000')
    const [consumption, setConsumption] = useState(0)

    const navigate = useNavigate()
    // const flags = useFlags()

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
                <h1>Simule sua Economia</h1>
                <MaskedInput 
                    mask={kwhMask}
                    value={spent}
                    onChange={event => setSpent(event.target.value)}
                    // style='padding: 0'
                    render={(ref, props) => (
                        <TextField
                            inputRef={ref}
                            {...props}
                            label='Consumo mensal médio'
                            inputProps={{inputMode: 'numeric'}}
                        />
                    )}
                />
                <div className="econ-wrapper">
                    {/* {flags.map(flag => <Flag flag={flag} />)} */}
                    <Econ />
                </div>
            </div>
            <div className="blue-container">
                <h1>Seus Benefícios</h1>
                <div className="benefits-container">
                    <Benefits icon={() => <EconomyIcon />} title={'Economia'} text='Receba seus créditos de energia e economize em até 15% na sua fatura' />
                    <Benefits icon={() => <NoInvestmentIcon />} title={'Sem investimento'} text='Sem necessidade de alteração física no seu negócio ou investimento' />
                    <Benefits icon={() => <RenewableEnergyIcon />} title={'Energia renovável'} text='Os créditos de energia são gerados por fontes renováveis' />
                </div>
                <button onClick={() => goToSignUp()} className='simulator-signup-button'>Quero economizar!</button>
            </div>
        </div>
    )
}