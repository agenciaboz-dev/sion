import React from "react"
import { IMaskInput } from "react-imask"

export const Masked = (props, ref) => {
    return (
        <IMaskInput
            {...props}
            inputRef={ref} // pass ref to IMaskInput
        />
    )
}
