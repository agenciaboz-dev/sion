import { useEffect, useState } from 'react';
import { useFaq } from '../../hooks/useFaq';
import { Question } from './Question';
import './style.scss';
import { useTexts } from "../../hooks/useTexts"

export const Faq = () => {
    const [textsLoading, setTextsLoading] = useState(true)
    const texts = useTexts().faq
    const { text } = useTexts()

    const questions = useFaq()

    useEffect(() => {
        if (texts.length > 0) setTextsLoading(false)
    }, [texts])
    
    return (
        <div className='Faq-Component'>
            <div className="faq-anchor" id='faq'></div>
            <div className="faq-container">
                <div className="faq-header-container">
                {text({ text: <h2>{texts[0]?.text}</h2>, loading: textsLoading, height: "5vw" })}
                {text({ text: <p>{texts[1]?.text}</p>, loading: textsLoading, height: "5vw" })}
                </div>
                {questions.map(question => {
                    return (
                        <Question key={question.number} question={question} />
                    )
                })}
            </div>
        </div>
    )
}