export const useValidateCPF = () => {

    const validateCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, ''); // remove all non-digits
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // reject CPF with incorrect length or all same digits
        const digits = cpf.split('').map(digit => parseInt(digit));
        const sum = digits.slice(0, 9).reduce((acc, digit, index) => acc + digit * (10 - index), 0);
        const remainder1 = sum % 11;
        const firstDigit = remainder1 < 2 ? 0 : 11 - remainder1;
        if (digits[9] !== firstDigit) return false;
        const sum2 = digits.slice(0, 10).reduce((acc, digit, index) => acc + digit * (11 - index), 0);
        const remainder2 = sum2 % 11;
        const secondDigit = remainder2 < 2 ? 0 : 11 - remainder2;
        if (digits[10] !== secondDigit) return false;
        return true;
    }

    return validateCPF
}