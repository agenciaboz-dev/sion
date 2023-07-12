import { useContext } from "react"
import SellersContext from "../contexts/sellersContext"

export const useSellers = () => {
    const sellersContext = useContext(SellersContext)
    const sellers = sellersContext

    const add = (seller: User) => sellers.add(seller, true)
    const remove = (seller: User) => sellers.remove(seller, true)
    const update = (seller: User) => sellers.update(seller, true)

    return { ...sellers, add, remove, update }
}
