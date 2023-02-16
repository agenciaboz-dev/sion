import './style.scss';
import {ReactComponent as Arrow} from '../../images/arrow.svg'
import { CustomerPic } from './CustomerPic';
import { useCustomers } from '../../hooks/useCustomers';
import useMeasure from 'react-use-measure';

export const WhoGets = () => {
    
    const customers = useCustomers()
    const [ref, {height}] = useMeasure()

    return (
        <div className='WhoGets-Component' ref={ref} >
            <div className="blue-background"></div>
            <div className="white-background"></div>

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
                <Arrow style={{transform: 'scale(-1, 1)', cursor: 'pointer', filter: 'invert(94%) sepia(100%) saturate(1%) hue-rotate(87deg) brightness(104%) contrast(102%)'}} />
            </div>
        </div>
    )
}