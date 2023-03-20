export const Benefits = ({ title, text, icon: IconComponent }) => {
    
    return (
        <div className='Benefits-Component' >
            <div className="benefits-header">
                <IconComponent />
                <h2>{title}</h2>
            </div>
            <p>{text}</p>
        </div>
    )
}