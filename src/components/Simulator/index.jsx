import MaskedInput from 'react-text-mask';
import { useCallback, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { Benefits } from './Benefits';
import './style.scss';
import { createNumberMask } from 'text-mask-addons';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EconomyIcon } from "../../images/wb_economy_icon.svg"
import { ReactComponent as NoInvestmentIcon } from "../../images/wb_no_investment_icon.svg"
import { ReactComponent as RenewableEnergyIcon } from "../../images/wb_renewable_energy_icon.svg"
import { TextField } from "@mui/material"
import CurrencyFormat from "react-currency-format"
import COLORS from "../../sass/_colors.scss"
import { useNumberMask } from "../../hooks/useNumberMask"
// import { useFlags } from "../../hooks/useFlags"
import { useMediaQuery } from 'react-responsive';
import { useTexts } from '../../hooks/useTexts';


export const Simulator = () => {

  const [textsLoading, setTextsLoading] = useState(true)
  const texts = useTexts().simulator
  const { text } = useTexts()


    const Econ = () => {
        const [economy, setEconomy] = useState(0)

        useEffect(() => {
            setEconomy(consumption*0.1)
        }, [consumption])

        return (
            <div className="econ-container">
             {text({ text: <h3>{texts[1]?.text}</h3>, loading: textsLoading, height: "5vw" })}

                {/* <hr /> */}
                <div className="yearly-econ">
                    {/* <h4>Anual</h4> */}
                    <CurrencyFormat
                        value={economy*12}
                        displayType='text'
                        thousandSeparator='.'
                        decimalSeparator=','
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={'R$ '}
                        style={{fontSize: '1.5vw', fontWeight: 'bold', color: COLORS.primary}}
                    />
                    {text({ text: <p>{texts[2]?.text}</p>, loading: textsLoading, height: "5vw" })}
                </div>
                <hr />
                <div className="monthly-econ">
                    <CurrencyFormat
                        value={economy}
                        displayType='text'
                        thousandSeparator='.'
                        decimalSeparator=','
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={'R$ '}
                        style={{fontSize: '1vw', color: COLORS.primary}}
                        />
                      {text({ text: <p>{texts[3]?.text}</p>, loading: textsLoading, height: "5vw" })}
                </div>
            </div>
        )
    }
    
//   const Flag = ({ flag }) => {
//     const Icon = () => flag.icon
//     const [economy, setEconomy] = useState(0)

//     useEffect(() => {
//       setEconomy(consumption * flag.factor)
//     }, [consumption])
//     return (
//       <div className="flag-container">
//         <Icon />
//         <hr />
//         <h3>Anual</h3>
//         <CurrencyFormat
//           value={economy * 12}
//           displayType="text"
//           thousandSeparator="."
//           decimalSeparator=","
//           decimalScale={2}
//           fixedDecimalScale={true}
//           prefix={"R$ "}
//           style={{ fontSize: "1vw", fontWeight: "bold", color: COLORS.primary }}
//         />
//         <hr />
//         <p>Mensal</p>
//         <CurrencyFormat
//           value={economy * 12}
//           displayType="text"
//           thousandSeparator="."
//           decimalSeparator=","
//           decimalScale={2}
//           fixedDecimalScale={true}
//           prefix={"R$ "}
//           style={{ fontSize: "0.7vw", color: COLORS.primary }}
//         />
//       </div>
//     )
//   }

//   const flags = useFlags()

  const [spent, setSpent] = useState("")
  const [consumption, setConsumption] = useState(0)

  const navigate = useNavigate()
  const numberMask = useNumberMask()
  const isMobile = useMediaQuery({maxWidth: 600})

  const goToSignUp = () => {
    window.scrollTo(0, 200)
    navigate("/cadastro")
  }

  useEffect(() => {
    if (texts.length > 0) setTextsLoading(false)
  }, [texts])

  useEffect(() => {
    if (spent) {
      setConsumption(Number(spent.replace(/\D/g, "")))
    } else {
      setConsumption(0)
    }
  }, [spent])

  return (
      <div className="Simulator-Component">
          <div className="simulator-anchor" id="simulator"></div>
          <div className="white-container">
              {text({ text: <h1>{texts[0]?.text}</h1>, loading: textsLoading, height: "5vw" })}
              <MaskedInput
                  value={spent}
                  mask={numberMask}
                  onChange={(event) => setSpent(event.target.value)}
                  render={(ref, props) => (
                      <TextField
                          inputRef={ref}
                          {...props}
                          label="Digite seu consumo mensal"
                          InputProps={{
                              endAdornment: <p className="kwh">kWh</p>,
                              sx: {
                                  width: isMobile ? "72vw" : "100%",
                              },
                          }}
                          inputProps={{ inputMode: "numeric" }}
                      />
                  )}
              />

              {/* <div className="flags-container">
          {flags.map((flag) => (
            <Flag flag={flag} />
          ))}
        </div> */}

              <div className="econ-wrapper">
                  <Econ />
              </div>
          </div>
          <div className="blue-container">
              {text({ text: <h1>{texts[4]?.text}</h1>, loading: textsLoading, height: "5vw" })}
              <div className="benefits-container">
                  <Benefits icon={() => <EconomyIcon />} title={texts[5]?.text} text={texts[6]?.text} />
                  <Benefits icon={() => <NoInvestmentIcon />} title={texts[7]?.text} text={texts[8]?.text} />
                  <Benefits icon={() => <RenewableEnergyIcon />} title={texts[9]?.text} text={texts[10]?.text} />
              </div>
              <button onClick={() => window.open("https://wa.me/554130283782", "_blank")} className="simulator-signup-button">
                  Quero economizar!
              </button>
          </div>
      </div>
  )
}