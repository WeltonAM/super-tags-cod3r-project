import { faker } from "@faker-js/faker";
import Propriedade, {
  PropriedadeProps,
  PropriedadeTipo,
  PropriedadeValorTipo,
} from "../../src/super-tag/modelo/Propriedade";

const valores: Record<PropriedadeTipo, PropriedadeValorTipo> = {
  texto: faker.lorem.word(2),
  numero_inteiro: faker.number.int(),
  numero_real: faker.number.float(),
  checkbox: faker.helpers.arrayElement([true, false]),
  data: faker.date.birthdate(),
};

export default class PropriedadeBuilder {
  private constructor(private props: PropriedadeProps) {}

  static criar() {
    const tipo = faker.helpers.arrayElement<PropriedadeTipo>([
      "texto",
      "numero_inteiro",
      "numero_real",
      "checkbox",
      "data",
    ]);
    const valor = valores[tipo];
    return new PropriedadeBuilder({
      descricao: faker.lorem.words(3),
      tipo,
      valor,
    });
  }

  static criarListaCom(qtde: number): PropriedadeProps[] {
    const propriedade = (i: number) => PropriedadeBuilder.criar().agora().props;
    return Array.from({ length: qtde }).map((_, i) => propriedade(i));
  }

  comId(id: string): PropriedadeBuilder {
    this.props.id = id;
    return this;
  }

  semId(): PropriedadeBuilder {
    this.props.id = undefined;
    return this;
  }

  comDescricao(descricao: string): PropriedadeBuilder {
    this.props.descricao = descricao;
    return this;
  }

  semDescricao(): PropriedadeBuilder {
    this.props.descricao = undefined;
    return this;
  }

  comTipo(tipo: PropriedadeTipo) {
    this.props.tipo = tipo;
    return this;
  }

  semTipo() {
    this.props.tipo = undefined;
    return this;
  }

  comValor(valor: PropriedadeValorTipo) {
    this.props.valor = valor;
    return this;
  }

  semValor() {
    this.props.valor = undefined;
    return this;
  }

  agora(): Propriedade {
    return new Propriedade(this.props);
  }
}
