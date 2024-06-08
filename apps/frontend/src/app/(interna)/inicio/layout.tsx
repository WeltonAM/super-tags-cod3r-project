export interface PaginaProps {
    children: any
}

export default function Pagina(props: PaginaProps) {
    return (
        <div>
            {props.children}
        </div>

    )
}
