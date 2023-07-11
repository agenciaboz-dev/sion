import { useContext } from "react"
import SellersContext from "../contexts/sellersContext"

export const useSellers = () => {
    const sellersContext = useContext(SellersContext)

    const sellers = {
        list: sellersContext.value,
        sellers: sellersContext.value,
        set: sellersContext.setValue,
        loading: sellersContext.loading,
        setLoading: sellersContext.setLoading,
        add: (seller: User) => sellersContext.setValue([...sellersContext.value, seller]),
        remove: (seller: User) => sellersContext.setValue(sellersContext.value.filter((item) => item.id != seller.id)),
        update: (seller: User) => sellersContext.setValue([...sellersContext.value.filter((item) => item.id != seller.id), seller]),
    }

    return sellers
}
