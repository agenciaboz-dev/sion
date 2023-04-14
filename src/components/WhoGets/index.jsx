import './style.scss';
import {ReactComponent as Arrow} from '../../images/arrow.svg'
import { CustomerPic } from './CustomerPic';
import { useCustomersTop } from '../../hooks/useCustomersTop';
import { useCustomersBottom } from '../../hooks/useCustomersBottom';
import useMeasure from 'react-use-measure';

export const WhoGets = () => {
    
    const customersTop = useCustomersTop()
    const customersBottom = useCustomersBottom()
    const [ref, {height}] = useMeasure()

    return (
        <div className='WhoGets-Component' ref={ref} >
            <div className="blue-background"></div>
            <div className="white-background"></div>

            <h1>Quem recebe nossa energia</h1>
            <div className="main-container">
                {/* <Arrow style={{cursor: 'pointer', width: '3vw'}} /> */}
                <div className="pictures">
                    <div className="customers-top">
                        {customersTop.map(customer => {
                            return (
                                <CustomerPic key={customersTop.indexOf(customer)} customer={customer} />
                            )
                        })}
                    </div>
                    <div className="customers-bottom">
                        {customersBottom.map(customer => {
                            return (
                                <CustomerPic key={customersBottom.indexOf(customer)} customer={customer} />
                            )
                        })}
                    </div>
                </div>
                {/* <Arrow style={{transform: 'scale(-1, 1)', cursor: 'pointer', filter: 'invert(94%) sepia(100%) saturate(1%) hue-rotate(87deg) brightness(104%) contrast(102%)', width: '3vw'}} /> */}
            </div>
        </div>
    )
}