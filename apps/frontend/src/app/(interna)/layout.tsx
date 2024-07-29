"use client"

import { useState } from 'react';
import ForcarUsuarioAutenticado from "@/components/auth/ForcarUsuarioAutenticacao"
import BarraLateral from "@/components/shared/BarraLateral"
import MenuPrincipal from "@/components/shared/MenuPrincipal"
import { SuperTagProvider } from '@/data/contexts/ContextoSuperTag';

export interface PaginaProps {
    children: any
}

export default function Pagina(props: PaginaProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleBarraLateral = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <ForcarUsuarioAutenticado>
            <SuperTagProvider>
                <div className="flex flex-col min-h-screen">
                    <MenuPrincipal toggleBarraLateral={toggleBarraLateral} isSidebarOpen={isSidebarOpen} />
                    <div className="flex flex-1">
                        <BarraLateral isOpen={isSidebarOpen} />
                        {props.children}
                    </div>
                </div>
            </SuperTagProvider>
        </ForcarUsuarioAutenticado>
    )
}
