import { Contract } from "./contract"

export interface User {
    id: number
    username: string
    email: string
    password: string
    name: string
    phone: string
    birth: Date
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
