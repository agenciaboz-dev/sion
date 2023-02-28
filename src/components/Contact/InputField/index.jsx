
export const InputField = ({ type, id, title, handleChange }) => {
    
    return (
        <div className='InputField-Component' >
            <label htmlFor={id}>{title}</label>
            <input type={type || "text"} name={id} onChange={handleChange} />
        </div>
    )
}