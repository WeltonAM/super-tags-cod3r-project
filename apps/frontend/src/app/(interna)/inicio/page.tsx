'use client'
import useAutenticacao from "@/data/hooks/useAutenticacao"

export default function Inicio() {
    const { logout } = useAutenticacao();

    return (
        <div className="">
            INICIO
        </div>
    )
}
