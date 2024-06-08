import { IconArrowsLeftRight, IconLogout, IconSettings, IconTrash } from "@tabler/icons-react"
import Link from "next/link"

export default function MenuUsuario() {
    // const { logout } = useAutenticacao()

    return (
        <div className="relative inline-block text-left">
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
                        Usuário
                    </div>
                    <Link href="/usuario" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                        <IconSettings size={20} className="inline-block mr-2" />
                        Settings
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <div className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
                        Sistema
                    </div>
                    {/* <button className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100" role="menuitem" onClick={logout}>
                        <IconLogout size={20} className="inline-block mr-2" />
                        Sair da Aplicação
                    </button> */}
                </div>
            </div>
        </div>
    )
}
