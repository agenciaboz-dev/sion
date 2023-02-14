import { HowItem } from './HowItem';
import './style.scss';

export const HowWorks = () => {
    
    return (
        <div className='HowWorks-Component' id='how' >
            <h1>Como funciona?</h1>

            <hr />
            <HowItem right={true} title='Lorem ipsum dolor sit' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' />
            <hr />
            <HowItem title='Lorem ipsum dolor sit' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' />
        </div>
    )
}