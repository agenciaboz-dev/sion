import './style.scss';
import {ReactComponent as WhatsappIcon} from '../../images/whatsapp_green_icon.svg'

export const WhatsappButton = () => {

    return (
      <div className="WhatsappButton-Component" onClick={() => (window.location.href = "https://wa.me/554130283782")}>
        <WhatsappIcon />
      </div>
    )

}