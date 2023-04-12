import { useFaq } from '../../hooks/useFaq';
import { Question } from './Question';
import './style.scss';

export const Faq = () => {

    const questions = useFaq()
    
    return (
        <div className='Faq-Component' id='faq' >
            <div className="faq-top-container">
                <div className="faq-header-container">
                    <h2>Dúvidas frequentes</h2>
                    <p>Aqui estão as respostas para as perguntas mais frequentes. Encontre soluções rápidas para as suas dúvidas logo abaixo.</p>
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