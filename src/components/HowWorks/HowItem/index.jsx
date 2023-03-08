export const HowItem = ({ right, title, text, icon: IconComponent }) => {
    
    return (
        <div className='HowItem-Component' >
            <div className="left">{right ? <h3>{title}</h3> : <p>{text}</p>}</div>
            <IconComponent />
            <div className="right">{right ? <p>{text}</p> : <h3>{title}</h3>}</div>
        </div>
    )
}