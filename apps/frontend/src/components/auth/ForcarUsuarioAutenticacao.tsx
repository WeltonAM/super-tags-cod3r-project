"use client"
import { useRouter } from "next/navigation"
import useAutenticacao from "@/data/hooks/useAutenticacao"

interface ForcarUsuarioAutenticadoProps {
    children: any
}

export default function ForcarUsuarioAutenticado(props: ForcarUsuarioAutenticadoProps) {
    const router = useRouter()
    const { usuarioAutenticado, carregando } = useAutenticacao()

    if (carregando) return null

    if (!usuarioAutenticado) {
        router.push("/")
        return null
    }

    return props.children
}
