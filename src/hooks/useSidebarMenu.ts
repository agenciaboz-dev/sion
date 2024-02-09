export const useSidebarMenu = () => {
    const links: SidebarMenu[] = [
        {
            id: 0,
            name: "Painel",
            location: "",
            adm: true,
            seller: true,
            operation: true,
            commertial: true,
            submenu: [
                {
                    id: 1,
                    name: "Perfil",
                    location: "/dashboard/profile",
                },
                {
                    id: 2,
                    name: "Contratos",
                    location: "/dashboard/",
                },
                {
                    id: 3,
                    name: "Usuários",
                    location: "/dashboard/sellers",
                },
                {
                    id: 4,
                    name: "Cadastrar UC",
                    location: "/dashboard/register_uc",
                },
                {
                    id: 5,
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
                    id: 1,
                    name: "Novo Usuário",
                    location: "/dashboard/new_seller",
                },
                {
                    id: 2,
                    name: "Novo quadro",
                    location: "/dashboard/boards/new",
                },
                {
                    id: 3,
                    name: "Status de contrato",
                    location: "/dashboard/boards/status",
                },
                {
                    id: 4,
                    name: "Whatsapp",
                    location: "/dashboard/whatsapp",
                    adm: true,
                },
                {
                    id: 5,
                    name: "Logs",
                    location: "/dashboard/logs",
                    adm: true,
                },
            ],
        },
        {
            id: 2,
            name: "Comercial",
            location: "",
            adm: true,
            commertial: true,
            submenu: [
                {
                    id: 1,
                    name: "Novo quadro",
                    location: "/dashboard/boards/new",
                },
            ],
        },
        {
            id: 3,
            name: "Operacional",
            location: "",
            adm: true,
            operation: true,
            submenu: [
                {
                    id: 1,
                    name: "Novo quadro",
                    location: "/dashboard/boards/new",
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
                    id: 1,
                    name: "Textos",
                    location: "/dashboard/texts",
                },
                {
                    id: 2,
                    name: "Tarifa de Energia",
                    location: "/dashboard/rate",
                },
                {
                    id: 3,
                    name: "Imagens das seções",
                    location: "/dashboard/images",
                },
                {
                    id: 4,
                    name: "Imagens dos clientes",
                    location: "/dashboard/customers_images",
                },
            ],
        },
    ]

    return links
}
