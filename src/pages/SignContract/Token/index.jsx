import ReactCodeInput from 'react-verification-code-input';

export const Token = ({ setOpenSnackbar, setError, setStage, contract }) => {

    const handleSubmit = values => {
        console.log(values)
    }

    const verifyToken = (value) => {
        if (value == contract.token) {
            setStage(3)
        } else {
            setOpenSnackbar(true)
            setError('Token inválido')
        }
    }
    
    return (
        <div className='Token-Component' >
            <h3>Enviamos um token para o email: {contract.email}</h3>
            <ReactCodeInput type="number" fields={5} onComplete={verifyToken} />
        </div>
    )
}