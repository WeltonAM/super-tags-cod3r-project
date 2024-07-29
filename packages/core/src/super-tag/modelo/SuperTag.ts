import Entidade, { EntidadeProps } from "../../compartilhado/Entidade";
import Id from "../../compartilhado/Id";
import { PropriedadeProps } from "./Propriedade";
import Propriedades from "./Propriedades";
import SuperTags from "./SuperTags";

export interface SuperTagProps extends EntidadeProps {
  titulo?: string;
  emoji?: string;
  propriedades?: PropriedadeProps[];
  chavePai?: string | null;
  filhas?: SuperTagProps[];
}

export default class SuperTag extends Entidade<SuperTag, SuperTagProps> {
  readonly titulo: string;
  readonly emoji: string;
  readonly propriedades: Propriedades;
  readonly chavePai: Id | undefined;
  readonly filhas: SuperTags;

  constructor(props: SuperTagProps) {
    super(props);
    this.titulo = props.titulo || "Título Padrão";
    this.emoji = props.emoji || "👨‍💻";
    this.propriedades = new Propriedades(props.propriedades ?? []);
    this.chavePai = props.chavePai ? new Id(props.chavePai) : undefined;
    this.filhas = new SuperTags(props.filhas ?? []);
  }
}
