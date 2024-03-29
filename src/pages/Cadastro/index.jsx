import { useEffect, useState } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { BackgroundContainer } from '../../components/BackgroundContainer';
import { Progress } from './Progress';
import { ReactComponent as ChoseIcon } from '../../images/check.svg'
import './style.scss';
import { Formulario } from './Formulario';
import SlideRoutes from 'react-slide-routes';
import { useClient } from '../../hooks/useClient';
import { Fatura } from './Fatura';
import { Contrato } from './Contrato';
import { WhatsappButton } from '../../components/WhatsappButton';

export const Cadastro = () => {
    const PessoaComponent = () => {
        
        const Pessoa = ({ name, value, description }) => {
            const [clicked, setClicked] = useState(false)
    
            const nextStage = () => {
                client.setValue({...client.value, pessoa: value})
                setPessoa(value)
                setTimeout(() => {
                    navigate('/cadastro/formulario')
                }, 500)
            }

            useEffect(() => {
                if (pessoa == value) {
                    setClicked(true)
                }
            }, [pessoa])
    
            return (
                <div className="pessoa-container" onClick={() => nextStage()}>
                    <div className="text-container">
                        <h1>{name}</h1>
                        <p>{description}</p>
                    </div>
                    <div className="chose-container" style={{opacity: clicked ? 1 : 0.7}}>
                        {clicked ? <ChoseIcon /> : <div className="circle"></div> }
                    </div>
                </div>
            )
        }

        useEffect(() => {
            setProgressBarStage(31)
        }, [])
    
        return (
            <div className="pessoa-wrapper">
                <Pessoa name='Pessoa Física' value='fisica' description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'} />
                <Pessoa name='Pessoa Jurídica' value='juridica' description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'} />
            </div>
        )
    }

    const navigate = useNavigate()
    const location = useLocation()

    const [stage, setStage] = useState(0)
    const [pessoa, setPessoa] = useState(null)
    const [progressBarStage, setProgressBarStage] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const client = useClient()

    useEffect(() => {
       console.log({stage})
    }, [stage])

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <div className='Cadastro-Page' >
            <BackgroundContainer>
                <div className="main-container" style={{opacity: loaded ? 1 : 0, transition: '0.5s'}}>
                    <Progress stage={stage} progressBarStage={progressBarStage} />
                    <div className="content">
                    <SlideRoutes location={location} duration={1000}>
                            <Route index element={<PessoaComponent />} />
                            <Route path='/formulario' element={<Formulario pessoa={pessoa} setPessoa={setPessoa} setProgressBarStage={setProgressBarStage} />} />
                            <Route path='/fatura' element={<Fatura setProgressBarStage={setProgressBarStage} setStage={setStage} />} />
                            <Route path='/contrato' element={<Contrato setProgressBarStage={setProgressBarStage} setStage={setStage} />} />
                    </SlideRoutes>
                    </div>
                    <div className="white-background"></div>
                    <div className="blue-background"></div>
                </div>
            </BackgroundContainer>
            <WhatsappButton />
        </div>
    )
}