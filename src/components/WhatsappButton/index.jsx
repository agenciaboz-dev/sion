import './style.scss';
// import {ReactComponent as WhatsappIcon} from '../../images/whatsapp_green_icon.svg'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useMediaQuery } from 'react-responsive';

export const WhatsappButton = () => {
  const isMobile = useMediaQuery({maxWidth: 600})

  return (
    <div className="WhatsappButton-Component" onClick={() => (window.location.href = "https://wa.me/554130283782")}>
      <WhatsAppIcon sx= {isMobile? 'background: #00B314; color: white; height: 7.5vw; width: 7.5vw;' : 'background: #00B314; color: white; height: 2.5vw; width: 2.5vw;'
        }/>
    </div>
  )

}