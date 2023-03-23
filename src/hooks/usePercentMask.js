import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const usePercentMask = () => {
    // Create number mask with variable thousands separator and decimal point
    const percentMask = createNumberMask({
        prefix: '',
        suffix: ' %',
        thousandsSeparatorSymbol: '.',
        decimalSymbol: ',',
        allowDecimal: true,
        decimalLimit: 2,
        integerLimit: 2,
        allowNegative: false,
        allowLeadingZeroes: false
    });

    return percentMask
}