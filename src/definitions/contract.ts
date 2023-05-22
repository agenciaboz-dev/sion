import { User } from "./user"

export interface Contract {
    id: number
    unit: string
    date: Date
    ip: string
    pessoa: string
    supplier: string
    name: string
    birth: Date
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
    seller: User
    seller_id: number
    rdstation: any
    omie: any
    financial: any
    logs: any
}
