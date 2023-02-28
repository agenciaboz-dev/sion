import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import { HowItem } from './HowItem';
import './style.scss';
import {ReactComponent as Icon} from '../../images/how_item.svg';

export const HowWorks = ({ main_container_height, advert_height }) => {

    const [ref, {height}] = useMeasure()

    return (
        <div className='HowWorks-Component' id='how' ref={ref} >
            <div className="background-container" style={{height: main_container_height - advert_height}}>

            </div>
            <div className="blue-background"></div>
            <div className="white-background" style={{height: height * 1.05}}></div>
            <h1>Como funciona?</h1>
            
            <hr />
            <HowItem icon={() => <Icon className="how-item-icon" />} right title='Energia Renovável' text='Nossa empresa tem se destacado na geração de energia renovável, oferecendo preços mais baixos em comparação às distribuidoras convencionais. Utilizando fontes renováveis e tecnologias inovadoras, conseguimos maximizar a produção de energia e reduzir custos operacionais.' />
            <hr />
            <HowItem icon={() => <Icon className="how-item-icon" />} title='Convertida em Créditos' text='A energia produzida é injetada na rede e convertida em créditos de energia, que podem ser usados para reduzir a conta de luz do proprietário. O sistema de geração distribuída torna-se uma alternativa econômica e sustentável para os consumidores, permitindo que economizem em suas contas de luz.' />
            <hr />
            <HowItem icon={() => <Icon className="how-item-icon" />} right title='Distribuida aos consumidores' text='Após a conversão da energia injetada em créditos de energia, distribuímos esses créditos entre os consumidores. Em seguida, emitimos a cobrança com o desconto de até 15%, baseado na quantidade de créditos gerados e utilizados pelo cliente.' />
            <hr />
            <HowItem icon={() => <Icon className="how-item-icon" />} title='Gerando desconto de até 15% na fatura' text='Com base na quantidade de créditos gerados e utilizados, a fatura da distribuidora é automaticamente ajustada, com desconto de até 15%. Esse desconto representa uma economia significativa para nossos cooperados e é possível graças ao valor de mercado dos créditos de energia.' />
        </div>
    )
}