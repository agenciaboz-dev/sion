import { useEffect } from 'react';
import './style.scss';

export const Contrato = ({ setProgressBarStage, setStage }) => {

    useEffect(() => {
        setProgressBarStage(100)
        setStage(2)

    }, [])
    
    return (
        <div className='Contrato-Component' >
            <h1>click sign</h1>
        </div>
    )
}