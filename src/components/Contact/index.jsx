import { Form, Formik } from 'formik';
import { useState } from 'react';
import { InputField } from '../InputField';
import {ReactComponent as FolderIcon} from '../../images/folder.svg'
import {ReactComponent as MapIcon} from '../../images/map.svg'
import {ReactComponent as WhatsappIcon} from '../../images/whatsapp.svg'
import './style.scss';
import { useMediaQuery } from 'react-responsive';

export const Contact = () => {

    const [showForm, setShowForm] = useState(false)
    const isMobile = useMediaQuery({maxWidth: 600})

    const wrapper_style = {
        height: showForm ? (isMobile ? '125vw' : '15vw') : null,
        margin: showForm ? (isMobile ? '16vw 0' : '7vw') : (isMobile ? '7vw 0' : 0)
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
    
    return (
        <div className='Contact-Component' style={wrapper_style} >
            { !showForm ? 
            <div className="title">
                <h4>Ficou com mais alguma dúvida? Fale com um dos nossos assessores</h4>
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
                    <h1 className='contact-us-h1'>Entre em Contato</h1>
                    <div className="info-item">
                        <FolderIcon className='info-icon'/>
                        <input type="text" className='readonly-contact-info' readOnly value={'comercial@sionenergia.com.br'} />
                    </div>
                    <div className="info-item">
                        <MapIcon className='info-icon'/>
                        <input type="text" className='readonly-contact-info' readOnly value={'Rua Dr. Manoel Pedro, 365, 21º andar. Curitiba - PR'} />
                    </div>
                    <div className="info-item">
                        <WhatsappIcon className='info-icon'/>
                        <input type="text" className='readonly-contact-info' readOnly value={'(41) 3533-5910'} />
                    </div>
                </div>
            </div>
            }

        </div>
    )
}