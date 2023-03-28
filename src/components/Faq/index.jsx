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
                {/* {questions.map(question => {
                    return (
                        <Question key={question.number} question={question} />
                    )
                })} */}
                <div className='questions-container'>
                    <div className="questions-row">
                        <div className="question-answer">
                            <h3>Quais os benefícios da Cooperativa de Energia?</h3>
                            <p>Como cooperado, você terá redução nos custos com energia e receberá energia renovável. Tudo isso com investimento zero e sem alterações físicas no seu negócio.</p>
                        </div>
                        <div className="question-answer">
                            <h3>Preciso fazer algum investimento?</h3>
                            <p>Não. O investimento é zero. A Cooperativa recebe apenas uma taxa de adesão por empresa (CNPJ). Caso sua empresa resolva sair da Cooperativa, esse valor é devolvido integralmente.</p>
                        </div>
                        <div className="question-answer">
                            <h3>O que é necessário para participar da Cooperativa?</h3>
                            <p>É necessário um gasto mensal médio acima de R$2.000,00 em energia.</p>
                        </div>
                    </div>
                    <div className="questions-row">
                        <div className="question-answer">
                            <h3>Como faço se minha empresa quiser sair da Cooperativa? É cobrado multa?</h3>
                            <p>É simples! Pedimos apenas que nos avise com 6 meses de antecedência e nenhuma multa é cobrada. Você volta a receber energia da distribuidora automaticamente.</p>
                        </div>
                        <div className="question-answer">
                            <h3>Se houver algum problema ou indisponibilidade momentânea na usina, ficarei sem energia?</h3>
                            <p>Não. O fornecimento de energia permanece de responsabilidade da distribuidora local (Copel, Energisa, Enel, entre outras). Assim, sua empresa continua a receber energia normalmente mesmo caso haja alguma indisponibilidade momentânea com nossas usinas.</p>
                        </div>
                        <div className="question-answer">
                            <h3>Se a Cooperativa não gerar os créditos de energia em algum mês, o que acontece?</h3>
                            <p>Você pagará sua conta de luz para a distribuidora, com os mesmos valores e da mesma forma que fazia antes de ser um cooperado da Sion Energia.</p>
                        </div>
                    </div>
                    <a href="">Carregar mais</a>
                </div>
            </div>
        </div>
    )
}