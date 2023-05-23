import { SidebarMenu } from "../definitions/sidebar"

export const useSidebarMenu = () => {
    const links: SidebarMenu[] = [
        {
            id: 0,
            name: "Perfil",
            location: "/dashboard/profile",
        },
        {
            id: 1,
            name: "Clientes",
            location: "/dashboard/contracts",
        },
        {
            id: 2,
            name: "Vendedores",
            location: "/dashboard",
        },
        {
            id: 3,
            name: "Novo vendedor",
            location: "/dashboard",
            adm: true,
        },
        {
            id: 4,
            name: "Tarifa de energia",
            location: "/dashboard/rate",
            adm: true,
        },
        {
            id: 5,
            name: "Validações",
            location: "/dashboard",
            adm: true,
        },
        {
            id: 6,
            name: "Visual",
            location: "/dashboard",
            adm: true,
        },
        {
            id: 7,
            name: "Textos",
            location: "/dashboard",
            adm: true,
        },
    ]

    return links
}
