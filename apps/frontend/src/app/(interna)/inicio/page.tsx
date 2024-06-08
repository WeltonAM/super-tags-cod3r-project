'use client'
import useAutenticacao from "@/data/hooks/useAutenticacao"

export default function Inicio() {
    const { logout } = useAutenticacao();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-5">
            INICIO

            <button
                onClick={logout}
            >
                Logout
            </button>
        </div>
    )
}
