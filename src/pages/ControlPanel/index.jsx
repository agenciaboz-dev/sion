import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useUser } from '../../hooks/useUser';
import './style.scss';

export const ControlPanel = () => {
    const [user, setUser] = useUser()
    const storage = useLocalStorage()
    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        storage.set('user', null)
        navigate('/login')
    }

    useEffect(() => {
        if (!user?.adm) {
            navigate('/login')
        }
    }, [])
    
    return (
        <div className='ControlPanel-Page' >
            <button onClick={() => logout()}>Sair</button>
            {JSON.stringify(user, null, 4)}
        </div>
    )
}