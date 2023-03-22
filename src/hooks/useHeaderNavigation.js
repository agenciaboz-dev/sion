import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useLogout } from "./useLogout"

export const useHeaderNavigation = () => {
    const path = useLocation().pathname
    const navigate = useNavigate()
    const logout = useLogout()

    const paths = {
        ['/']: {
            label: 'Site',
            navigate: () => window.location.href = 'https://cooperativasion.com.br'
        },
        ['/login']: {
            label: 'Site',
            navigate: () => window.location.href = 'https://cooperativasion.com.br'
        },
        ['/cadastro']: {
            label: 'Sair',
            navigate: logout
        },
        ['*']: {
            label: 'Voltar',
            navigate: () => navigate(-1)
        },
    }


    const headerObject = useMemo(() => {
        return {
            label: paths[path]?.label || paths['*'].label,
            navigate: () => paths[path]?.navigate() || paths['*'].navigate()
        }

    }, [path])

    
    return headerObject
}