import Entidade, { EntidadeProps } from "./Entidade";
import Id from "./Id";

export default abstract class ListaEntidade<Tipo, Props extends EntidadeProps> {
  readonly todas: Entidade<Tipo, Props>[];

  constructor(todas: Props[]) {
    this.todas = todas.map((item) => this.criarEntidade(item));
  }

  get props(): Props[] {
    return this.todas.map((a) => a.props);
  }

  abstract clone(todas: Props[]): ListaEntidade<Tipo, Props>;

  abstract criarEntidade(item: Props): Entidade<Tipo, Props>;

  adicionar(item: Props) {
    return this.clone([...this.props, item]);
  }

  remover(entidade: Entidade<Tipo, Props> | Id | string) {
    const entidadeId = this.idSimples(entidade);
    const entidades = this.props.filter((item) => item.id !== entidadeId);
    return this.clone(entidades);
  }

  atualizar(entidade: Props) {
    const entidades = this.props.map((item) =>
      item.id === entidade.id ? entidade : item
    );
    return this.clone(entidades);
  }

  contem(entidade: Entidade<Tipo, Props> | Id | string) {
    const entidadeId = this.idSimples(entidade);
    return this.todas.some((item) => item.id.valor === entidadeId);
  }

  protected idSimples(entidade: Entidade<Tipo, Props> | Id | string): string {
    return entidade instanceof Entidade
      ? entidade.id.valor
      : entidade instanceof Id
        ? entidade.valor
        : entidade;
  }
}
