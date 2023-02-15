
export const CustomerPic = ({ customer }) => {
    
    return (
        <div className='CustomerPic-Component' >
            <img src={customer.image} alt="" />
        </div>
    )
}