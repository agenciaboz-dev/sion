import { useContext } from "react"
import SellersContext from "../contexts/sellersContext"

export const useSellers = () => {
    const sellersContext = useContext(SellersContext)

    const sellers = {
        list: sellersContext.value.sort((a, b) => a.id - b.id),
        sellers: sellersContext.value.sort((a, b) => a.id - b.id),
        set: sellersContext.setValue,
        loading: sellersContext.loading,
        setLoading: sellersContext.setLoading,
        add: (seller: User) => sellersContext.setValue([...sellersContext.value, seller]),
        remove: (seller: User) => sellersContext.setValue(sellersContext.value.filter((item) => item.id != seller.id)),
        update: (seller: User) => sellersContext.setValue([...sellersContext.value.filter((item) => item.id != seller.id), seller]),
        get: (id: number | string) => sellersContext.value.filter((seller) => seller.id == Number(id))[0],
    }

    return sellers
}
