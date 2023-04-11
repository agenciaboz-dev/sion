import { useEffect } from 'react';
import { useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { api } from '../../../api';
import { useColors } from '../../../hooks/useColors';
import { useUser } from '../../../hooks/useUser';
import {ReactComponent as Padlock} from '../../../images/safe_environment_padlock.svg'

export const Token = ({ setOpenSnackbar, setError, setStage, contract }) => {

    const [user, setUser] = useUser()
    const colors = useColors()
    const [invalid, setInvalid] = useState(false)

    const [inputStyle, setInputStyle] = useState({
        fontFamily: 'Poppins',
        MozAppearance: 'textfield',
        textAlign: 'center',
        height: '15vw',
        width: '15vw',
        borderRadius: '2vw',
        border: 'none',
        outline: 'none',
        fontSize: '10vw',
        fontWeight: 'bold'
        
    })

    const handleChange = values => {
        if (values.length == 5) {
            verifyToken(values)
        } else {
            setInvalid(false)
        }
    }

    const verifyToken = (value) => {
        if (value == contract.token) {
            const data = { 
                id: contract.id, 
                name: user?.name || contract.name,
                email: user?.email || contract.email,
                cpf: user?.cpf || contract.cpf,
                cnpj: contract.cnpj,
                user: user
            }
            
            api.post('/contract/sign', data)
            .then(response => console.log(response.data))
            .catch(error => console.error(error))

            setStage(3)

        } else {
            setInvalid(true)
            setOpenSnackbar(true)
            setError('Token inválido')
        }
    }

    useEffect(() => {
        if (invalid) {
            setInputStyle({...inputStyle, boxShadow: `0 0 2px 2px ${colors.red}`})
        } else {
            setInputStyle({...inputStyle, boxShadow: '0 0 5px 0 #999'})
        }
    }, [invalid])

    return (
        <div className='Token-Component' >
            <h3>Enviamos um TOKEN<br />para o e-mail:<br />{user?.email || contract.email}</h3>
            {/* <ReactCodeInput type="number" fields={5} onComplete={verifyToken} /> */}
            <div className="token-insert-container">
                <p className='insert-token'>Insira o Token:</p>
                <ReactCodeInput className='code-container' onChange={handleChange} type='text' fields={5} onComplete={verifyToken} inputMode='numeric' inputStyle={inputStyle} />
                <p className='resend-token-button'>Reenviar token via e-mail</p>
            </div>
            <div className="safe-environment-statement">
                <Padlock className='padlock-icon'/>
                <p className='safe-environment-p'>Ambiente seguro da Cooperativa Sion</p>
            </div>
        </div>
    )
}