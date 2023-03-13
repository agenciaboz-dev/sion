export const useValidationErrors = () => {
    const defaults = {
        required: 'Este campo é obrigatório',
        number: 'Este campo aceita apenas números',
        email: 'Este campo requer um email válido',
        cpf: 'CPF inválido',
        rg: 'RG inválido',
        cep: 'CEP inválido',
        phone: 'Telefone inválido'
    }
    
    return defaults
}
