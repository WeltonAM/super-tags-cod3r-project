import Id from "../../compartilhado/Id";
import SuperTagPropriedade, {
  SuperTagPropriedadeProps,
} from "./SuperTagPropriedade";

export default class SuperTagPropriedades {
  todas: SuperTagPropriedade[];

  constructor(todas: SuperTagPropriedadeProps[]) {
    this.todas = todas.map((p) => new SuperTagPropriedade(p));
  }

  get props(): SuperTagPropriedadeProps[] {
    return this.todas.map((p) => p.props);
  }

  incluir(novasPropriedades: SuperTagPropriedadeProps[]): void {
    const novasInstancias = novasPropriedades.map(
      (p) => new SuperTagPropriedade(p)
    );
    this.todas.push(...novasInstancias);
  }

  excluir(propriedade: SuperTagPropriedade | Id | string): void {
    const propriedadeId = this.idSimples(propriedade);

    console.log(`Excluindo propriedade com ID: ${propriedadeId}`);
    this.todas = this.todas.filter((p) => p.id.valor !== propriedadeId);
  }

  private idSimples(propriedade: SuperTagPropriedade | Id | string): string {
    return propriedade instanceof SuperTagPropriedade
      ? propriedade.id.valor
      : propriedade instanceof Id
        ? propriedade.valor
        : propriedade;
  }
}
