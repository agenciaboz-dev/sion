export const Benefits = ({ title, text, icon: IconComponent }) => {
    
    return (
        <div className='Benefits-Component' >
            <IconComponent />
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}