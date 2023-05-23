import Button from '@mui/material/Button';
import React from 'react';
import './style.scss';

interface RateProps {}

export const Rate:React.FC<RateProps> = ({}) => {

    const saveRate = ()=> {
        console.log("opa")
    }  

    return (
        <div className="Rate-Component" >
            <p className="title">Tarifa de Energia</p>
            <input type="number" className="rate" />
            <Button onClick={saveRate} variant="contained">
                    Salvar
            </Button>
        </div>
    )
}