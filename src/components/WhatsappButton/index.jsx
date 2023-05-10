import './style.scss';
// import {ReactComponent as WhatsappIcon} from '../../images/whatsapp_green_icon.svg'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const WhatsappButton = () => {

    return (
      <div className="WhatsappButton-Component" onClick={() => (window.location.href = "https://wa.me/554130283782")}>
        <WhatsAppIcon sx={
          'background: #00B314; color: white; height: 4.25vw; width: 4.25vw; padding: 0.75vw; border-radius: 50%'
          }/>
      </div>
    )

}