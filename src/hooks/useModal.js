import { useContext } from "react"
import ModalContext from "../contexts/ModalContext"

export const useModal = () => {
    const modalContext = useContext(ModalContext);

    return modalContext;
}