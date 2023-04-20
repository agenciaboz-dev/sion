import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useMeasure from 'react-use-measure';
import { HowItem } from './HowItem';
import './style.scss';
import {ReactComponent as BlackBackgroundSunIcon} from '../../images/bb_sun_icon.svg';
import {ReactComponent as CreditsConversionIcon} from '../../images/bb_credits_conversion_icon.svg';
import {ReactComponent as CreditsDistributionIcon} from '../../images/bb_credits_distribution_icon.svg';
import {ReactComponent as DiscountsIcon} from '../../images/bb_discount_icon.svg';

export const HowWorks = ({ main_container_height, advert_height }) => {

    const [ref, {height}] = useMeasure()
    const isMobile = useMediaQuery({maxWidth: 450})

    return (
        <div className='HowWorks-Component' id='how' ref={ref} >
            <div className="background-container" style={{height: main_container_height - advert_height}}>

            </div>
            <div className="blue-background"></div>
            <div className="white-background" style={{height: isMobile? height : height * 1.15}}></div>
            <div className="how-works-containers">
                <div className="details-container">
                    <h1>Uma maneira simples de você economizar com a energia do seu negócio</h1>
                    <HowItem icon={() => <BlackBackgroundSunIcon className="how-item-icon" />} title='Energia Renovável' text='A usina produz e injeta energia renovável com custo inferior à distribuidora de energia.' />
                    <hr />
                    <HowItem icon={() => <CreditsConversionIcon className="how-item-icon" />} title='Convertida em Créditos' text='A distribuidora local converte a energia injetada em créditos.' />
                    <hr />
                    <HowItem icon={() => <CreditsDistributionIcon className="how-item-icon" />} title='Créditos distribuídos' text='Distribuimos os créditos entre os cooperados e emitimos a cobrança incluindo o desconto que foi negociado.' />
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