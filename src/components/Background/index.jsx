import { useImages } from "../../hooks/useImages"
import "./style.scss"

export const Background = ({ style, height }) => {
    const images = useImages()
    console.log(images)

    return (
        <div className="Background-Component" style={style || null}>
            <img src={images.length > 0 && images[0].src} alt="" style={{ height }} />
        </div>
    )
}
