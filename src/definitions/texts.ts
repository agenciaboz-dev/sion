import { User } from "./user"

export interface Texts {
    id: number
    section: number
    text: string
    date: string
    user: User
}
