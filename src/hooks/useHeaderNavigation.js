import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useLogout } from "./useLogout"
import { useStage } from "./useStage"

export const useHeaderNavigation = () => {
    const path = useLocation().pathname
    const navigate = useNavigate()
    const logout = useLogout()
    const { setStage, setBar } = useStage()

    const paths = {
        ['/']: {
            label: 'Site',
            navigate: () => window.location.href = 'https://cooperativasion.com.br'
        },
        ['/login']: {
            label: 'Site',
            navigate: () => window.location.href = 'https://cooperativasion.com.br'
        },
        ['/sign']: {
            label: 'Site',
            navigate: () => window.location.href = 'https://cooperativasion.com.br'
        },
        ['/cadastro']: {
            label: 'Sair',
            navigate: logout,
            stage: 1,
        },
        ['/cadastro/formulario']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro/pessoa'),
            stage: 3,
        },
        ['/cadastro/formulario/representante']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro/formulario'),
            stage: 4,
        },
        ['/cadastro/anexos']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro/formulario'),
            stage: 5,
        },
        ['/cadastro/pessoa']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro'),
            stage: 2,
        },
        ['/cadastro/contrato']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro/anexos'),
            stage: 6,
        },
        ['/cadastro/financeiro']: {
            label: 'Voltar',
            navigate: () => navigate('/cadastro/contrato'),
            stage: 7,
        },
    }


    const headerObject = useMemo(() => {
        setStage(paths[path].stage)
        setBar(paths[path].stage-1)

        return {
            label: paths[path].label,
            navigate: () => paths[path].navigate(),
        }

    }, [path])

    
    return headerObject
}