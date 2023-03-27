import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const useKWhMask = () => {

    // Create number mask with variable thousands separator and decimal point
    const kwhMask = createNumberMask({
        prefix: '',
        suffix: ' kWh',
        thousandsSeparatorSymbol: '.',
        decimalSymbol: ',',
        allowDecimal: true,
        decimalLimit: 2,
    });

    return kwhMask
}