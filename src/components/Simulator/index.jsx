import { Benefits } from './Benefits';
import './style.scss';

export const Simulator = () => {
    
    return (
        <div className='Simulator-Component' >
            <div className="left-container">
                <Benefits title={'Economia'} text='Receba seus créditos de energia e economize em até 15% na sua fatura' />
                <Benefits title={'Sem investimento'} text='Sem necessidade de alteração física no seu negócio ou investimento' />
                <Benefits title={'Energia renovável'} text='Os créditos de energia são gerados por fontes renováveis' />
            </div>
            <div className="right-container">
                <h2>Simulador de Economia</h2>
                <div className="input-container">
                    <label htmlFor="company">Distribuidora</label>
                    <select name="company" id="company">
                        <option value="copel">Copel</option>
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="spent">Gasto mensal</label>
                    <input type="text" id='spent' />
                </div>

                <button>Calcular</button>
            </div>
        </div>
    )
}