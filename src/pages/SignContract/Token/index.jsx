import ReactCodeInput from 'react-code-input';
import { api } from '../../../api';
import { useUser } from '../../../hooks/useUser';

export const Token = ({ setOpenSnackbar, setError, setStage, contract }) => {

    const [user, setUser] = useUser()

    const handleSubmit = values => {
        console.log(values)
    }

    const verifyToken = (value) => {
        if (value == contract.token) {
            const data = { 
                id: contract.id, 
                name: user?.name || contract.name,
                email: user?.email || contract.email,
                cpf: user?.cpf || contract.cpf,
                cnpj: contract.cnpj
            }
            
            api.post('/contract/sign', data)
            .then(response => console.log(response.data))
            .catch(error => console.error(error))

            setStage(3)

        } else {
            setOpenSnackbar(true)
            setError('Token inválido')
        }
    }

    const inputStyle = {
        fontFamily: 'Poppins',
        MozAppearance: 'textfield',

    }

    const inputStyleInvalid = {
        fontFamily: 'Poppins',
        MozAppearance: 'textfield',

    }
    
    return (
        <div className='Token-Component' >
            <h3>Enviamos um token para o email: {user?.email || contract.email}</h3>
            {/* <ReactCodeInput type="number" fields={5} onComplete={verifyToken} /> */}
            <ReactCodeInput className='code-container' type='number' fields={5} onComplete={verifyToken} inputMode='numeric' inputStyle={inputStyle} inputStyleInvalid={inputStyleInvalid} />
        </div>
    )
}