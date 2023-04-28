import { createNumberMask } from "text-mask-addons"

export const useNumberMask = () => {
  const numberMask = createNumberMask({
    prefix: "",
    suffix: "",
    thousandsSeparatorSymbol: ".",
    decimalSymbol: ",",
    allowDecimal: true,
    decimalLimit: 2,
    integerLimit: 9,
    allowNegative: false,
    allowLeadingZeroes: false,
  })

  return numberMask
}
