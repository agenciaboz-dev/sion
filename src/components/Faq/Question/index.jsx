import Collapsible from 'react-collapsible'
import {ReactComponent as Arrow} from '../../../images/faq_arrow.svg'

const QuestionBlock = ({ question, open }) => {
    return (
        <div className="question">
            <Arrow style={open ? { transform: "rotate(90deg)" } : null} />
            <h3>{question.text}</h3>
        </div>
    )
}

const AnswerBlock = ({ question }) => {
    return (
        <div className="answer">
                <p>{question.answer}</p>
        </div>
    )
}

export const Question = ({ question }) => {
    
    return (
        <div className='Question-Component' >
            <Collapsible trigger={<QuestionBlock question={question} />}
                triggerWhenOpen={<QuestionBlock question={question} open={true} />}
            >
                <AnswerBlock question={question} />
            </Collapsible>
        </div>
    )
}