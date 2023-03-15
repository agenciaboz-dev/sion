import { useUser } from '../../hooks/useUser';
import './style.scss';

export const ControlPanel = () => {
    const [user, setUser] = useUser()
    
    return (
        <div className='ControlPanel-Page' >
            {JSON.stringify(user, null, 4)}
        </div>
    )
}