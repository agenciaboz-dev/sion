import { useImages } from "../../hooks/useImages"
import "./style.scss"

export const Background = ({ style, height }) => {
    const images = useImages()
    console.log(images)

    return (
        <div className="Background-Component" style={style || null}>
            <img src={images.cover} alt="" style={{ height }} />
        </div>
    )
}
