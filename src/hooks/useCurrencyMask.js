import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const useCurrencyMask = () => {
    const locale = navigator.language || 'en-US';

    // Get thousands separator and decimal point from locale
    const formatter = new Intl.NumberFormat(locale);
    const parts = formatter.formatToParts(1234.56);
    const thousandsSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;

    // Create number mask with variable thousands separator and decimal point
    const currencyMask = createNumberMask({
        prefix: 'R$ ',
        suffix: '',
        thousandsSeparatorSymbol: thousandsSeparator,
        decimalSymbol: decimalSeparator,
        allowDecimal: true,
        decimalLimit: 2,
    });

    return currencyMask
}