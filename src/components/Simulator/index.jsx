import MaskedInput from 'react-text-mask';
import { useCallback, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { Benefits } from './Benefits';
import './style.scss';
import { createNumberMask } from 'text-mask-addons';

export const Simulator = () => {

    const [spent, setSpent] = useState('')
    const [saving, setSaving] = useState('')

    const currencyMask = createNumberMask({
        prefix: 'R$ ',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
        decimalLimit: 2,
        allowNegative: false,
        allowLeadingZeroes: false,
    })

    const getSpentNumber = useCallback(() => {
        const number = spent ? spent.split('R$ ')[1].replaceAll('.', '').replaceAll(',', '.') : 0

        return +number
    }, [spent])

    return (
        <div className='Simulator-Component' id='simulator' >
            <div className="left-container">
                <Benefits title={'Economia'} text='Receba seus créditos de energia e economize em até 15% na sua fatura' />
                <Benefits title={'Sem investimento'} text='Sem necessidade de alteração física no seu negócio ou investimento' />
                <Benefits title={'Energia renovável'} text='Os créditos de energia são gerados por fontes renováveis' />
            </div>
            <div className="right-container">
                <h2>Simulador de Economia</h2>
                <div className="input-container">
                    <label htmlFor="company">Distribuidora</label>
                    <select as='select' name="company" id="company">
                        <option value="copel">Copel</option>
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="spent">Gasto mensal</label>
                    <MaskedInput id='spent' 
                        mask={currencyMask}
                        guide={false}
                        value={spent}
                        onChange={event => setSpent(event.target.value)}
                        placeholder={'R$ '}
                    />
                </div>
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    min={1}
                    max={1000000}
                    value={typeof spent === 'number' ? spent : getSpentNumber()}
                    onChange={value => setSpent(value)}
                />
                <div className="input-container">
                    <label htmlFor="saving">Economia anual</label>
                    <MaskedInput id='saving' 
                        mask={currencyMask}
                        guide={false}
                        value={saving}
                        onChange={event => setSaving(event.target.value)}
                        placeholder={'R$ '}
                    />
                </div>

                <button className='simulator-calculate-button'>Calcular</button>
            </div>
        </div>
    )
}