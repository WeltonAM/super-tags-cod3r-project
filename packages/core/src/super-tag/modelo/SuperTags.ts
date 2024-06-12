import Id from "../../compartilhado/Id";
import SuperTag, { SuperTagProps } from "./SuperTag";

type SuperTagID = SuperTag | Id | string;

export default class SuperTags {
  readonly todas: SuperTag[];

  constructor(todas: SuperTagProps[]) {
    this.todas = todas.map((item) => new SuperTag(item));
  }

  get props(): SuperTagProps[] {
    return this.todas.map((a) => a.props);
  }

  adicionar(item: SuperTagProps) {
    return new SuperTags([...this.props, item]);
  }

  remover(superTag: SuperTagID) {
    const superTagId = this.idSimples(superTag);
    const filhas = this.props.filter((filha) => filha.id !== superTagId);
    return new SuperTags(filhas);
  }

  atualizar(item: SuperTagProps) {
    const filhas = this.props.map((filha) =>
      filha.id === item.id ? item : filha
    );
    return new SuperTags(filhas);
  }

  contem(superTag: SuperTagID) {
    const superTagId = this.idSimples(superTag);
    return this.todas.some((item) => item.id.valor === superTagId);
  }

  private idSimples(superTag: SuperTagID): string {
    return superTag instanceof SuperTag
      ? superTag.id.valor
      : superTag instanceof Id
        ? superTag.valor
        : superTag;
  }
}
