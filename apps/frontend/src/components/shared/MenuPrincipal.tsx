import { IconEdit, IconHome2, IconVideo } from "@tabler/icons-react"
import Link from "next/link"

interface MenuItemProps {
    label: string;
    icon: JSX.Element;
    href: string;
}

export default function MenuPrincipal() {
    return (
        <div>
            <span className="text-xs text-gray-500">Geral</span>
            <MenuItem label="Início" icon={<IconHome2 size={18} strokeWidth={1.5} />} href="/" />
            <MenuItem label="Meus Cursos" icon={<IconVideo size={18} strokeWidth={1.5} />} href="/catalogo" />
        </div>
    )
}

function MenuItem({ label, icon, href }: MenuItemProps) {
    return (
        <Link href={href} className="flex items-center text-gray-700 hover:text-gray-900 py-1 px-3">
            {icon}
            <span className="ml-2">{label}</span>
        </Link>
    )
}
