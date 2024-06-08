"use client"

import ForcarUsuarioAutenticado from "@/components/auth/ForcarUsuarioAutenticacao"
import MenuPrincipal from "@/components/shared/MenuPrincipal"

export interface PaginaProps {
    children: any
}

export default function Pagina(props: PaginaProps) {
    return (
        <ForcarUsuarioAutenticado>
            <MenuPrincipal />
            {props.children}
        </ForcarUsuarioAutenticado>
    )
}
