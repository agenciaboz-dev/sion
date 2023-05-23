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
    adm: boolean
    ip: string
    contracts: Contract[]
    logs: any
}
