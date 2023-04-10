import { useEffect } from 'react';
import { useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { api } from '../../../api';
import { useColors } from '../../../hooks/useColors';
import { useUser } from '../../../hooks/useUser';

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
        border: '1px solid',
        boxShadow: '0 0 5px #999'
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
                cnpj: contract.cnpj
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
            setInputStyle({...inputStyle, borderColor: colors.red})
        } else {
            setInputStyle({...inputStyle, borderColor: '#eee'})
        }
    }, [invalid])

    return (
        <div className='Token-Component' >
            <h3>Enviamos um token para o email: <br /> {user?.email || contract.email}</h3>
            {/* <ReactCodeInput type="number" fields={5} onComplete={verifyToken} /> */}
            <ReactCodeInput className='code-container' onChange={handleChange} type='number' fields={5} onComplete={verifyToken} inputMode='numeric' inputStyle={inputStyle} />
        </div>
    )
}