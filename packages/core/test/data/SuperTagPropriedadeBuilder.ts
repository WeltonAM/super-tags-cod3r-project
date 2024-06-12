import { SuperTagPropriedade, SuperTagPropriedadeProps } from "../../src";
import Id from "../../src/compartilhado/Id";

export default class SuperTagPropriedadeBuilder {
  private constructor(public propriedadeProps: SuperTagPropriedadeProps) {}

  static criar() {
    return new SuperTagPropriedadeBuilder({
      id: new Id().valor,
      descricao: "Descrição padrão",
      tipo: "texto",
      valor: null,
    });
  }

  comId(id: string): SuperTagPropriedadeBuilder {
    this.propriedadeProps.id = id;
    return this;
  }

  comDescricao(descricao: string): SuperTagPropriedadeBuilder {
    this.propriedadeProps.descricao = descricao;
    return this;
  }

  comTipo(tipo: string): SuperTagPropriedadeBuilder {
    this.propriedadeProps.tipo = tipo;
    return this;
  }

  comValor(valor: any): SuperTagPropriedadeBuilder {
    this.propriedadeProps.valor = valor;
    return this;
  }

  agora(): SuperTagPropriedade {
    return new SuperTagPropriedade(this.propriedadeProps);
  }
}
