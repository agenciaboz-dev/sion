import { User } from "./user"

export interface Image {
    id: number
    name: string
    title: string
    src: string
    size: string
    user: User
    date: string
}
