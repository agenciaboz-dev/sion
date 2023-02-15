import './style.scss';
import {ReactComponent as Arrow} from '../../images/arrow.svg'
import { CustomerPic } from './CustomerPic';
import { useCustomers } from '../../hooks/useCustomers';

export const WhoGets = () => {
    
    const customers = useCustomers()

    return (
        <div className='WhoGets-Component' >
            <h1>Quem recebe nossa energia</h1>
            <div className="main-container">
                <Arrow style={{cursor: 'pointer'}} />
                <div className="pictures">
                    {customers.map(customer => {
                        return (
                            <CustomerPic key={customers.indexOf(customer)} customer={customer} />
                        )
                    })}
                </div>
                <Arrow style={{transform: 'scale(-1, 1)', cursor: 'pointer'}} />
            </div>
        </div>
    )
}