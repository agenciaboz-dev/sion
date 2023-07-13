import { useContext } from "react"
import SellersContext from "../contexts/sellersContext"
import { useUser } from "./useUser"

export const useSellers = () => {
    const sellersContext = useContext(SellersContext)
    const sellers = sellersContext
    const { user } = useUser()

    const add = (seller: User) => sellers.add(seller, user)
    const remove = (seller: User) => sellers.remove(seller, user)
    const update = (seller: User) => sellers.update(seller, user)

    return { ...sellers, add, remove, update }
}
