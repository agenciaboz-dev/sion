import { useFaq } from '../../hooks/useFaq';
import { Question } from './Question';
import './style.scss';

export const Faq = () => {

    const questions = useFaq()
    
    return (
        <div className='Faq-Component' id='faq' >
            <h2>Dúvidas frequentes</h2>
            {questions.map(question => {
                return (
                    <Question key={question.number} question={question} />
                )
            })}
            <div className="contact">
                <h4>Ficou com mais alguma dúvida? Fale com um dos nossos assessores</h4>
                <button>Entrar em contato</button>
            </div>
        </div>
    )
}