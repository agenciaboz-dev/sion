import './style.scss';

export const About = () => {
    
    return (
      <div className="About-Component">
        <div className="about-anchor" id="about"></div>
        <div className="img-container">
          <img src="/images/about_building.webp" alt="" />
          <p>Sede Sion em Curitiba</p>
        </div>
        <div className="main-container">
          <h2 className="about-us">Sobre nós</h2>
          <h2>A Sion Energia</h2>
          <p>A Sion Energia é uma Holding com três Unidades de Negócio nas áreas de Geração e Comercialização de Energia.</p>
          <p>
            A Sion Geração desenvolve e faz a operação de usinas. A Sion Gestão é uma gestora de energia de grandes
            consumidores e a Cooperativa de Energia atende empresas do Varejo.
          </p>
          <p className="about-item">Presente em todas as regiões do Brasil</p>
          <p className="about-item">+ 2,3 mil unidades consumidoras atendidas</p>
          <p className="about-item">+ 10,1 milhões de kWh mensais sob nossa administração</p>
          <p className="about-item">6 milhões de m² entre usinas construídas e em desenvolvimento</p>
        </div>
      </div>
    )
}