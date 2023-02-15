import {ReactComponent as Arrow} from '../../../images/faq_arrow.svg'

export const Question = ({ question }) => {
    
    return (
        <div className='Question-Component' >
            <div className="question">
                <Arrow />
                <h3>{question.number}. {question.text}</h3>
            </div>
            <p>{question.answer}</p>
        </div>
    )
}