export interface SidebarMenu {
    id: number
    name: string
    location: string
    adm?: boolean
    seller?: boolean
    site?: boolean
    submenu?: SidebarMenu[]
}
