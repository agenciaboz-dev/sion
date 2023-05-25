import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { InputField } from '../InputField';
import {ReactComponent as LetterIcon} from '../../images/letter.svg'
import {ReactComponent as MapIcon} from '../../images/map.svg'
import {ReactComponent as WhatsappIcon} from '../../images/whatsapp.svg'
import './style.scss';
import { useMediaQuery } from 'react-responsive';
import { useTexts } from "../../hooks/useTexts"

export const Contact = () => {
    const [textsLoading, setTextsLoading] = useState(true)
    const texts = useTexts().contact
    const { text } = useTexts()

    const [showForm, setShowForm] = useState(false)
    const isMobile = useMediaQuery({maxWidth: 600})

    const wrapper_style = {
        height: showForm ? (isMobile ? '125vw' : '15vw') : null,
        margin: showForm ? (isMobile ? '42vw 0' : '7vw') : (isMobile ? '18vw 0' : 0)
    }

    const initial_inputs = {
        name: '',
        phone: '',
        email: '',
        message: ''
    }

    const sendForm = (values) => {
        setShowForm(false)
    }
    
    useEffect(() => {
        if (texts.length > 0) setTextsLoading(false)
    }, [texts])
    
    return (
        <div className='Contact-Component' style={wrapper_style} >
            { !showForm ? 
            <div className="title">
                {text({ text: <h4>{texts[5]?.text}</h4>, loading: textsLoading, height: "5vw" })}
                <button className='show-contact-form-button' onClick={() => setShowForm(true)}>Entrar em contato</button>
            </div> : 
            <div className="contact-form">
                <Formik initialValues={initial_inputs} onSubmit={(values) => sendForm(values)}>
                    {({handleChange}) => (
                        <Form>
                            
                            <InputField className='contact-input' id='name' title={'Nome'} handleChange={handleChange} />
                            <InputField className='contact-input' id='phone' title={'Telefone'} handleChange={handleChange} />
                            <InputField className='contact-input' id='email' title={'Email'} handleChange={handleChange} />
                            <InputField className='contact-input' multiline inputProps={{height: '6vw'}} id='message' title={'Mensagem'} handleChange={handleChange} />
                            <button className='contact-send-button' type='submit'>Enviar</button>
                        </Form>
                    )}
                </Formik>
                <div className="info">
                    {text({ text: <h1 className='contact-us-h1'>{texts[0]?.text}</h1>, loading: textsLoading, height: "5vw" })}
                    <div className="info-item">
                        <LetterIcon className='info-icon'/>
                        <input type="text" className='readonly-contact-info' readOnly value={texts[1]?.text} />
                    </div>
                    <div className="info-item">
                        <MapIcon className='info-icon'/>
                        <div className="info-break-line">
                            <input type="text" className='readonly-contact-info' readOnly value={texts[2]?.text}  />
                            <input type="text" className='readonly-contact-info' readOnly value={texts[3]?.text}  />
                        </div>
                    </div>
                    <div className="info-item">
                        <WhatsappIcon className='info-icon'/>
                        <input type="text" className='readonly-contact-info' readOnly value={texts[4]?.text}  />
                    </div>
                </div>
            </div>
            }

        </div>
    )
}