import './style.scss';

export const Background = ({ style }) => {
    
    return (
        <div className='Background-Component' style={style || null} >
            <img src="/images/usinas-background.webp" alt="" />
        </div>
    )
}