import { SidebarMenu } from "../definitions/sidebar"

export const useSidebarMenu = () => {
    const links: SidebarMenu[] = [
        {
            id: 0,
            name: "Painel",
            location: "",
            adm: true,
            submenu: [
                {
                    id: 5,
                    name: "Perfil",
                    location: "/dashboard/profile",
                },
                {
                    id: 6,
                    name: "Meus Contratos",
                    location: "/dashboard/",
                },
                {
                    id: 7,
                    name: "Cadastrar UC",
                    location: "/dashboard/register_uc",
                },
                {
                    id: 21,
                    name: "Quadros",
                    location: "/dashboard/boards",
                },
            ],
        },
        {
            id: 1,
            name: "Administrador",
            location: "",
            adm: true,
            submenu: [
                {
                    id: 8,
                    name: "Vendedores",
                    location: "/dashboard/sellers",
                },
                {
                    id: 9,
                    name: "Novo Vendedor",
                    location: "/dashboard/new_seller",
                    adm: true,
                },
                {
                    id: 10,
                    name: "Novo quadro",
                    location: "/dashboard/boards/new",
                    adm: true,
                },
            ],
        },
        {
            id: 2,
            name: "Comercial",
            location: "",
            adm: true,
            submenu: [
                {
                    id: 11,
                    name: "Clientes",
                    location: "/dashboard/contracts",
                },
            ],
        },
        {
            id: 3,
            name: "Operacional",
            location: "",
            adm: true,
            submenu: [
                {
                    id: 13,
                    name: "Clientes",
                    location: "/dashboard/approved",
                },
            ],
        },
        {
            id: 4,
            name: "Web",
            location: "",
            adm: true,
            site: true,
            submenu: [
                {
                    id: 18,
                    name: "Textos",
                    location: "/dashboard/texts",
                    adm: true,
                },
                {
                    id: 19,
                    name: "Imagens",
                    location: "/dashboard/images",
                    adm: true,
                },
                {
                    id: 20,
                    name: "Tarifa de Energia",
                    location: "/dashboard/rate",
                    adm: true,
                },
            ],
        },
    ]

    return links
}
