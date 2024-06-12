import Entidade, { EntidadeProps } from "../../compartilhado/Entidade";
import Id from "../../compartilhado/Id";
import Emoji from "../provedor/Emoji";
import Propriedade from "../provedor/Propriedade";

export interface SuperTagProps extends EntidadeProps {
    titulo?: string;
    emoji?: Emoji;
    propriedades?: Propriedade[];
    chaveRelacionamento?: string | Id;
}

export default class SuperTag extends Entidade<SuperTag, SuperTagProps> {
    readonly titulo: string;
    readonly emoji: Emoji;
    readonly propriedades: Propriedade[];
    readonly chaveRelacionamento?: Id;

    constructor(props: SuperTagProps) {
        super(props);
        this.titulo = props.titulo || "Título Padrão";
        this.emoji = props.emoji || { codigo: "1f423", url: "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png" };
        this.propriedades = props.propriedades || [];
        this.chaveRelacionamento = props.chaveRelacionamento instanceof Id ? props.chaveRelacionamento : props.chaveRelacionamento ? new Id(props.chaveRelacionamento) : undefined;
    }
}
