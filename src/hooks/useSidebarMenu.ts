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
                    id: 5,
                    name: "Perfil",
                    location: "/dashboard/profile",
                },
                {
                    id: 6,
                    name: "Contratos",
                    location: "/dashboard/",
                },
                {
                    id: 7,
                    name: "Usuários",
                    location: "/dashboard/sellers",
                },
                {
                    id: 8,
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
                    id: 9,
                    name: "Novo Usuário",
                    location: "/dashboard/new_seller",
                },
                {
                    id: 10,
                    name: "Novo quadro",
                    location: "/dashboard/boards/new",
                },
                {
                    id: 22,
                    name: "Status de contrato",
                    location: "/dashboard/boards/status",
                },
                {
                    id: 23,
                    name: "Whatsapp",
                    location: "/dashboard/whatsapp",
                    adm: true,
                },
                {
                    id: 24,
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
                    id: 24,
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
                    id: 25,
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
                    id: 18,
                    name: "Textos",
                    location: "/dashboard/texts",
                },
                {
                    id: 19,
                    name: "Imagens",
                    location: "/dashboard/images",
                },
                {
                    id: 20,
                    name: "Tarifa de Energia",
                    location: "/dashboard/rate",
                },
            ],
        },
    ]

    return links
}
