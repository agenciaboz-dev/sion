export const HowItem = ({ right, title, text, icon: IconComponent }) => {
    
    return (
        <div className='HowItem-Component' >
            <div className="HowItem-Icon">
                <IconComponent />
            </div>
            <div className="HowItem-Texts">
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}