import React from 'react';
import './style.scss';

interface CardProps {
    
}

export const Card:React.FC<CardProps> = ({  }) => {
    
    return (
        <div className='Card-Component' >
                <div className="one-column">
                    <div className="info-container">
                        <p className="name">[Nome do Cliente]/[UC]</p>
                        <p className="attach">3 anexos</p>
                        <p className="description">Adicionar descrição</p>
                        <button className='button' type="submit">[Nome do Vendedor]</button>
                    </div>
                </div>
        </div>
    )
}