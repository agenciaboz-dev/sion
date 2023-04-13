import { BackgroundContainer } from '../../components/BackgroundContainer';
import { Snackbar, Alert } from '@mui/material';
import './style.scss';
import { useEffect, useState } from 'react'
import { Confirmation } from './Confirmation';
import { Token } from './Token';
import { Signed } from './Signed';

export const SignContract = () => {
    
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [error, setError] = useState('')
    const [stage, setStage] = useState(1)
    const [contract, setContract] = useState({})

    useEffect(() => {
        console.log(contract)
        console.log(contract.token)
    }, [contract])
    
    return (
        <>
        <BackgroundContainer vendas>
            <div className='SignContract-Page' >
                {stage == 1 && <Confirmation setOpenSnackbar={setOpenSnackbar} setError={setError} setStage={setStage} setContract={setContract} />}
                {stage == 2 && <Token setOpenSnackbar={setOpenSnackbar} setError={setError} setStage={setStage} contract={contract} />}
                {stage == 3 && <Signed setOpenSnackbar={setOpenSnackbar} setError={setError} setStage={setStage} contract={contract} />}
            </div>
        </BackgroundContainer>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={() => setOpenSnackbar(false)} severity={'error'} sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>

        </>
    )
}