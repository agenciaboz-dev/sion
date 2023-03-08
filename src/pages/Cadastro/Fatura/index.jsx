import { CustomDashedBorder } from 'custom-dashed-border';
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../../hooks/useClient';
import {ReactComponent as DropIcon} from '../../../images/dropzone.svg'
import './style.scss';

export const Fatura = ({ setProgressBarStage, setStage }) => {
    const vw = window.innerHeight / 100

    const navigate = useNavigate()
    const client = useClient()


    const borderStyle = {
        stripe: 2 * vw, 
        spacing: 2 * vw
    }

    const goBack = () => {
        setStage(0)
        navigate(-1)
    }

    const nextStage = () => {
        navigate('/cadastro/contrato')
    }

    useEffect(() => {
        setProgressBarStage(68.3)
        setStage(1)

    }, [])
    
    return (
        <div className='Fatura-Component' >
            <h1>Anexar a fatura de energia</h1>
            <Dropzone onDrop={acceptedFiles => client.setValue({...client.value, fatura: acceptedFiles})}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()} className="dropzone">
                    <CustomDashedBorder top={borderStyle} left={borderStyle} right={borderStyle} bottom={borderStyle} >
                        <input {...getInputProps()} />
                        <DropIcon />
                        <p>Selecione um arquivo para fazer upload</p>
                        <p>ou arraste e solte aqui</p>
                    </CustomDashedBorder>
                </div>
                </section>
            )}
            </Dropzone>
            <div className="buttons-container">
                <button onClick={() => goBack()}>Voltar</button>
                <button onClick={() => nextStage()}>Avançar</button>
            </div>
        </div>
    )
}