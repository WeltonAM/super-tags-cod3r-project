"use client"

import ForcarUsuarioAutenticado from "@/components/auth/ForcarUsuarioAutenticacao"
import MenuPrincipal from "@/components/shared/MenuPrincipal"

export interface PaginaProps {
    children: any
}

export default function Pagina(props: PaginaProps) {
    return (
        <ForcarUsuarioAutenticado>
            <div className="flex flex-col min-h-screen">
                <MenuPrincipal />
                {props.children}
            </div>
        </ForcarUsuarioAutenticado>
    )
}
