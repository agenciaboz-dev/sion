import { SidebarMenu } from "../definitions/sidebar"

export const useSidebarMenu = () => {
    const links: SidebarMenu[] = [
        {
            id: 0,
            name: "Perfil",
            location: "/",
        },
        {
            id: 1,
            name: "Clientes",
            location: "/",
        },
        {
            id: 2,
            name: "Vendedores",
            location: "/",
        },
        {
            id: 3,
            name: "Novo vendedor",
            location: "/",
            adm: true,
        },
        {
            id: 4,
            name: "Tarifa de energia",
            location: "/",
            adm: true,
        },
        {
            id: 5,
            name: "Validações",
            location: "/",
            adm: true,
        },
        {
            id: 6,
            name: "Visual",
            location: "/",
            adm: true,
        },
        {
            id: 7,
            name: "Textos",
            location: "/",
            adm: true,
        },
    ]

    return links
}
