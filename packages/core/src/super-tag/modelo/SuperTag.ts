import Id from "../../compartilhado/Id";
import Emoji from "./Emoji";
import SuperTags from "./SuperTags";
import Entidade, { EntidadeProps } from "../../compartilhado/Entidade";
import { SuperTagPropriedadeProps } from "./SuperTagPropriedade";
import SuperTagPropriedades from "./SuperTagPropriedades";

export interface SuperTagProps extends EntidadeProps {
  titulo?: string;
  emoji?: Emoji;
  propriedades?: SuperTagPropriedadeProps[];
  chaveFilha?: string;
  chavePai?: string;
  filhas?: SuperTagProps[];
}

export default class SuperTag extends Entidade<SuperTag, SuperTagProps> {
  readonly titulo: string;
  readonly emoji: Emoji;
  readonly propriedades: SuperTagPropriedades;
  readonly chaveFilha: Id | undefined;

  readonly chavePai: Id | undefined;
  readonly filhas: SuperTags;

  constructor(props: SuperTagProps) {
    super(props);
    this.titulo = props.titulo || "Título Padrão";

    this.emoji = props.emoji || {
      codigo: "1f423",
      url: "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png",
    };

    this.propriedades = new SuperTagPropriedades(props.propriedades!);
    this.chaveFilha = props.chaveFilha ? new Id(props.chaveFilha) : undefined;

    this.chavePai = props.chavePai ? new Id(props.chavePai) : undefined;

    this.filhas = new SuperTags(props.filhas ?? []);
  }
}
