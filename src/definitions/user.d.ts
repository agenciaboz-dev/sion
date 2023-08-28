declare interface User {
    id: number
    username: string
    email: string
    password: string
    name: string
    phone: string
    birth: string
    cpf: string
    rg?: string
    address?: string
    number?: string
    district?: string
    cep?: string
    adm: boolean
    role: number
    ip: string
    contracts: Contract[]
    logs: never
}
