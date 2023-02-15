import './style.scss';

export const About = () => {
    
    return (
        <div className='About-Component' id='about' >
            <div className="img-container">
                <img src="/images/about_building.webp" alt="" />
                <p>Sede Sion em Curitiba</p>
            </div>
            <div className="main-container">
                <h2>Quem somos?</h2>
                <p>A Sion Energia é uma Holding com três Unidades de Negócio nas áreas de Geração e Comercialização de Energia.</p>
                <p>Presente em todas as regiões do Brasil</p>
                <p>+ 150 unidades consumidoras atendidas</p>
                <p>+ 5,2 milhões de kWh mensais em nossa Gestão</p>
                <p>+ 6 milhões de m² entre usinas construídas e em desenvolvimento</p>
            </div>
        </div>
    )
}