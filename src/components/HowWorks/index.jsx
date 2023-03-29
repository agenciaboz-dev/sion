import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import { HowItem } from './HowItem';
import './style.scss';
import {ReactComponent as BlackSunIcon} from '../../images/black_sun_icon.svg';
import {ReactComponent as RecycleIcon} from '../../images/recycle_icon.svg';
import {ReactComponent as DistributionsIcon} from '../../images/distributions_icon.svg';
import {ReactComponent as DiscountsIcon} from '../../images/discounts_icon.svg';

export const HowWorks = ({ main_container_height, advert_height }) => {

    const [ref, {height}] = useMeasure()

    return (
        <div className='HowWorks-Component' id='how' ref={ref} >
            <div className="background-container" style={{height: main_container_height - advert_height}}>

            </div>
            <div className="blue-background"></div>
            <div className="white-background" style={{height: height * 1.15}}></div>
            <div className="how-works-containers">
                <div className="details-container">
                    <h1>Uma maneira simples de você economizar com a energia do seu negócio</h1>
                    <HowItem icon={() => <BlackSunIcon className="how-item-icon" />} title='Energia Renovável' text='A usina produz e injeta energia renovável com custo inferior à distribuidora de energia.' />
                    <hr />
                    <HowItem icon={() => <RecycleIcon className="how-item-icon" />} title='Convertida em Créditos' text='A distribuidora local converte a energia injetada em créditos.' />
                    <hr />
                    <HowItem icon={() => <DistributionsIcon className="how-item-icon" />} title='Créditos distribuídos' text='Distribuimos os créditos entre os cooperados e emitimos a cobrança incluindo o desconto que foi negociado.' />
                    <hr />
                    <HowItem icon={() => <DiscountsIcon className="how-item-icon" />} title='Desconto de até 15% na fatura' text='Os cooperados recebem o crédito na conta da distrivuidora e pagam com desconto o valor da energia consumida.' />
                </div>
                <div className="photo-container">
                    <img src="../../images/como-funciona.webp" alt="" />
                </div>
            </div>
        </div>
    )
}