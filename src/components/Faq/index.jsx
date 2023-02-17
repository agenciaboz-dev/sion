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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                {/* {questions.map(question => {
                    return (
                        <Question key={question.number} question={question} />
                    )
                })} */}
                <div className="questions-container">
                    <div className="qcolumn">
                        <div className="question-answer">
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div className="question-answer">
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                    <div className="qcolumn">
                        <div className="question-answer">
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div className="question-answer">
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                    <div className="qcolumn">
                        <div className="question-answer">
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div className="question-answer">
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact">
                <h4>Ficou com mais alguma dúvida? Fale com um dos nossos assessores</h4>
                <button>Entrar em contato</button>
            </div>
        </div>
    )
}