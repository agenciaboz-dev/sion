import { useEffect, useState } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { BackgroundContainer } from '../../components/BackgroundContainer';
import { Progress } from './Progress';
import './style.scss';
import { Formulario } from './Formulario';
import SlideRoutes from 'react-slide-routes';
import { useClient } from '../../hooks/useClient';
import { Fatura } from './Fatura';
import { Contrato } from './Contrato';
import { useMediaQuery } from 'react-responsive';
import { ScrollTop } from '../../components/ScrollTop';
import { Calculadora } from './Calculadora';
import { PessoaChooser } from './PessoaChooser';

export const Cadastro = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const isMobile = useMediaQuery({maxWidth: 600})

    const [stage, setStage] = useState(0)
    const [progressBarStage, setProgressBarStage] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const client = useClient()
    const [pessoa, setPessoa] = useState(null)

    useEffect(() => {
       console.log({stage})
    }, [stage])

    useEffect(() => {
        setLoaded(true)

        setStage(0)
        setProgressBarStage(30)
    }, [])

    return (
        <div className='Cadastro-Page' >
            {isMobile && <ScrollTop />}
            <BackgroundContainer vendas>
                <div className="main-container" style={{opacity: loaded ? 1 : 0, transition: '0.5s'}}>
                    <Progress stage={stage} progressBarStage={progressBarStage} />
                    <div className="content">
                    <SlideRoutes location={location} duration={1000}>
                            <Route index element={<Calculadora />} />
                            <Route path='/pessoa' element={<PessoaChooser setProgressBarStage={setProgressBarStage} setStage={setStage} pessoa={pessoa} setPessoa={setPessoa} />} />
                            <Route path='/formulario' element={<Formulario pessoa={pessoa} setPessoa={setPessoa} setProgressBarStage={setProgressBarStage} setStage={setStage} />} />
                            <Route path='/anexos' element={<Fatura setProgressBarStage={setProgressBarStage} setStage={setStage} />} />
                            <Route path='/contrato' element={<Contrato setProgressBarStage={setProgressBarStage} setStage={setStage} />} />
                    </SlideRoutes>
                    </div>
                </div>
            </BackgroundContainer>
        </div>
    )
}