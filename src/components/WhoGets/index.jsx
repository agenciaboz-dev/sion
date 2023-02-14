import './style.scss';
import {ReactComponent as Arrow} from '../../images/arrow.svg'
import { CustomerPic } from './CustomerPic';

export const WhoGets = () => {
    
    return (
        <div className='WhoGets-Component' >
            <h1>Quem recebe nossa energia</h1>
            <div className="main-container">
                <Arrow style={{cursor: 'pointer'}} />
                <div className="pictures">
                    <CustomerPic image={'red'} />
                    <CustomerPic image={'blue'} />
                    <CustomerPic image={'black'} />
                    <CustomerPic image={'purple'} />
                    <CustomerPic image={'green'} />
                </div>
                <Arrow style={{transform: 'scale(-1, 1)', cursor: 'pointer'}} />
            </div>
        </div>
    )
}