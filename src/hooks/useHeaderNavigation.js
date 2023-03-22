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
        ['/cadastro/formulario']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro')
        },
        ['/cadastro/anexos']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro/formulario')
        },
        ['/cadastro/calculadora']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro/anexos')
        },
        ['/cadastro/contrato']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro/calculadora')
        },
    }


    const headerObject = useMemo(() => {
        return {
            label: paths[path].label,
            navigate: () => paths[path].navigate()
        }

    }, [path])

    
    return headerObject
}