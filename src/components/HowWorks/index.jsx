import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useMeasure from 'react-use-measure';
import { HowItem } from './HowItem';
import './style.scss';
import {ReactComponent as BlueBackgroundSunIcon} from '../../images/bb_sun_icon.svg';
import {ReactComponent as CreditsConversionIcon} from '../../images/bb_credits_conversion_icon.svg';
import {ReactComponent as CreditsDistributionIcon} from '../../images/bb_credits_distribution_icon.svg';
import {ReactComponent as DiscountsIcon} from '../../images/bb_discount_icon.svg';
import { useTexts } from "../../hooks/useTexts"

export const HowWorks = ({ main_container_height, advert_height }) => {
    const [textsLoading, setTextsLoading] = useState(true)
    const texts = useTexts().howWorks
    const { text } = useTexts()

    const [ref, { height }] = useMeasure()
    const isMobile = useMediaQuery({ maxWidth: 600 })

    useEffect(() => {
        if (texts.length > 0) setTextsLoading(false)
    }, [texts])

    return (
        <div className="HowWorks-Component" id="how" ref={ref}>
            <div className="background-container" style={{ height: main_container_height - advert_height }}></div>
            <div className="blue-background"></div>
            <div className="white-background" style={{ height: isMobile ? height : height * 1.25 }}></div>
            <div className="how-works-containers">
                <div className="details-container">
                    {text({ text: <h1>{texts[0]?.text}</h1>, loading: textsLoading, height: "5vw" })}
                    <HowItem
                        icon={() => <BlueBackgroundSunIcon className="how-item-icon" />}
                        title={texts[1]?.text}
                        text={texts[2]?.text}
                    />
                    <hr />
                    <HowItem
                        icon={() => <CreditsConversionIcon className="how-item-icon" />}
                        title="Convertida em Créditos"
                        text="A distribuidora local converte a energia injetada em créditos."
                    />
                    <hr />
                    <HowItem
                        icon={() => <CreditsDistributionIcon className="how-item-icon" />}
                        title="Créditos distribuídos"
                        text="Distribuimos os créditos entre os cooperados e emitimos a cobrança incluindo o benefício que foi negociado."
                    />
                    <hr />
                    <HowItem
                        icon={() => <DiscountsIcon className="how-item-icon" />}
                        title="Benefício de até 15% na energia"
                        text="Os cooperados recebem o crédito na conta da distribuidora e pagam com benefício o valor da energia consumida."
                    />
                </div>
                <div className="photo-container">
                    <img src="../../images/como-funciona-cropped.webp" alt="" />
                </div>
            </div>
        </div>
    )
}