import { SidebarMenu } from "../definitions/sidebar"

export const useSidebarMenu = () => {
    const links: SidebarMenu[] = [
        {
            id: 0,
            name: "Painel",
            location: "",
            adm: true,
            seller: true,
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
                    name: "Novo Kanban",
                    location: "/dashboard/new_kanban",
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
                {
                    id: 12,
                    name: "Validações",
                    location: "/dashboard/validations",
                    adm: true,
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
                {
                    id: 14,
                    name: "Validações",
                    location: "/dashboard/validations",
                    adm: true,
                },
                {
                    id: 15,
                    name: "Onboard",
                    location: "/dashboard/onboard",
                    adm: true,
                },
                {
                    id: 16,
                    name: "Atendimento",
                    location: "/dashboard/service",
                    adm: true,
                },
                {
                    id: 17,
                    name: "Chamados",
                    location: "/dashboard/called",
                    adm: true,
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
                    name: "Textos Site",
                    location: "/dashboard/texts",
                    adm: true,
                },
                {
                    id: 19,
                    name: "Imagens Site",
                    location: "/dashboard/images",
                    adm: true,
                },
                {
                    id: 20,
                    name: "Tarifas de Energia",
                    location: "/dashboard/rate",
                    adm: true,
                },
            ],
        },
    ]

    return links
}
