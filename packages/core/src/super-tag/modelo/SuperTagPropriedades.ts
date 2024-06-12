import Id from "../../compartilhado/Id";
import SuperTagPropriedade, {
  SuperTagPropriedadeProps,
} from "./SuperTagPropriedade";

export default class SuperTagPropriedades {
  readonly todas: SuperTagPropriedade[];

  constructor(todas: SuperTagPropriedadeProps[]) {
    this.todas = todas.map((p) => new SuperTagPropriedade(p));
  }

  get props(): SuperTagPropriedadeProps[] {
    return this.todas.map((p) => p.props);
  }

  incluir(novasPropriedades: SuperTagPropriedadeProps[]): SuperTagPropriedades {
    const propriedades = [...this.props, ...novasPropriedades];
    return new SuperTagPropriedades(propriedades);
  }

  excluir(
    propriedade: SuperTagPropriedade | Id | string
  ): SuperTagPropriedades {
    const propriedadeId = this.idSimples(propriedade);

    return new SuperTagPropriedades(
      this.props.filter((p) => p.id !== propriedadeId)
    );
  }

  atualizar(propriedade: SuperTagPropriedade): SuperTagPropriedades {
    const propriedadeId = this.idSimples(propriedade);

    const propriedades = this.todas.map((p) => {
      return p.id.valor === propriedadeId ? propriedade : p;
    });

    return new SuperTagPropriedades(propriedades.map((p) => ({ ...p.props })));
  }

  naoEncontradas(propriedades: SuperTagPropriedades): SuperTagPropriedades {
    const ids = propriedades.todas.map((p) => p.id.valor);

    const naoEncontradas = this.todas.filter((p) => !ids.includes(p.id.valor));

    return new SuperTagPropriedades(naoEncontradas.map((p) => p.props));
  }

  private idSimples(propriedade: SuperTagPropriedade | Id | string): string {
    return propriedade instanceof SuperTagPropriedade
      ? propriedade.id.valor
      : propriedade instanceof Id
        ? propriedade.valor
        : propriedade;
  }
}
