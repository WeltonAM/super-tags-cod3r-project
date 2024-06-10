import Entidade, { EntidadeProps } from "../../compartilhado/Entidade"
import Emoji from "../provedor/Emoji"
import Propriedade from "../provedor/Propriedade"

export interface SuperTagProps extends EntidadeProps {
    titulo?: string
    emoji?: Emoji
    propriedades?: Propriedade[]
}

export default class SuperTag extends Entidade<SuperTag, SuperTagProps> {
    readonly titulo: string
    readonly emoji: Emoji
    readonly propriedades: Propriedade[]

    constructor(props: SuperTagProps) {
        super(props)
        this.titulo = props.titulo || "Título Padrão"
        this.emoji = props.emoji || { emoji: "🌟", descricao: "Emoji Padrão" }
        this.propriedades = props.propriedades || []
    }
}
