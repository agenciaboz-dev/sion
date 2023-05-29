import { User } from "./user"

export interface Contract {
    id: number
    unit: string
    date: string
    ip: string
    pessoa: string
    supplier: string
    name: string
    birth: string
    email: string
    phone: string
    cep: string
    address: string
    district: string
    number: string
    city: string
    state: string
    cnpj: string
    company: string
    category: string
    cpf: string
    rg: string
    filename: string
    signatures: string
    active: boolean
    archived: boolean
    reproved: boolean
    wrong: boolean
    seller: User
    seller_id: number
    rdstation: never
    omie: never
    financial: never
    logs: never
}
