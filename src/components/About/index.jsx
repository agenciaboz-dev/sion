import './style.scss';
import { useTexts } from "../../hooks/useTexts"
import { useEffect, useState } from 'react';

export const About = () => {
    const [textsLoading, setTextsLoading] = useState(true)
    const texts = useTexts().about
    const { text } = useTexts()

    useEffect(() => {
      if (texts.length > 0) setTextsLoading(false)
    }, [texts])

    
    return (
      <div className="About-Component">
        <div className="about-anchor" id="about"></div>
        <div className="img-container">
          <img src="/images/about_building.webp" alt="" />
          {text({ text: <p>{texts[0]?.text}</p>, loading: textsLoading, height: "5vw" })}
        </div>
        <div className="main-container">
          <h2 className="about-us">Sobre nós</h2>
          {text({ text: <h2>{texts[1]?.text}</h2>, loading: textsLoading, height: "5vw" })}
          {text({ text: <p>{texts[2]?.text}</p>, loading: textsLoading, height: "5vw" })}
          {text({ text: <p>{texts[3]?.text}</p>, loading: textsLoading, height: "5vw" })}
          {text({ text: <p className="about-item">{texts[4]?.text}</p>, loading: textsLoading, height: "5vw"})}
          {text({ text: <p className="about-item">{texts[5]?.text}</p>, loading: textsLoading, height: "5vw" })}
          {text({ text: <p className="about-item">{texts[6]?.text}</p>, loading: textsLoading, height: "5vw" })}
          {text({ text: <p className="about-item">{texts[7]?.text}</p>, loading: textsLoading, height: "5vw" })}
          
        </div>
      </div>
    )
}