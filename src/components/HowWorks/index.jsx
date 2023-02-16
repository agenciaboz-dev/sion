import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import { HowItem } from './HowItem';
import './style.scss';

export const HowWorks = ({ main_container_height, advert_height }) => {

    const [ref, {height}] = useMeasure()

    return (
        <div className='HowWorks-Component' id='how' ref={ref} >
            <div className="background-container" style={{height: main_container_height - advert_height}}>

            </div>
            <div className="blue-background"></div>
            <div className="white-background" style={{height: height/* * 1.1*/}}></div>
            <h1>Como funciona?</h1>

            <hr />
            <HowItem right title='Lorem ipsum dolor sit' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' />
            <hr />
            <HowItem title='Lorem ipsum dolor sit' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' />
            <hr />
            <HowItem right title='Lorem ipsum dolor sit' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' />
            <hr />
            <HowItem title='Lorem ipsum dolor sit' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' />
        </div>
    )
}