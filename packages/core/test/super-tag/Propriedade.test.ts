import {
  PropriedadeTipo,
  PropriedadeValorTipo,
} from "../../src/super-tag/modelo/Propriedade";
import PropriedadeBuilder from "../data/PropriedadeBuilder";
import Teste from "../util/Teste";

describe("Propriedade", () => {
  test("deve criar uma Propriedade", () => {
    const descricao = "Nova Propriedade";
    const tipo = "texto";
    const valor = "Valor Teste";
    const propriedade = PropriedadeBuilder.criar()
      .comDescricao(descricao)
      .comTipo(tipo)
      .comValor(valor)
      .agora();
    expect(propriedade.id).toBeDefined();
    expect(propriedade.descricao).toBe(descricao);
    expect(propriedade.tipo).toBe(tipo);
    expect(propriedade.valor).toBe(valor);
  });

  type IData = { tipo: PropriedadeTipo; valor: PropriedadeValorTipo };

  const data: IData[] = [
    {
      tipo: "numero_inteiro",
      valor: 10,
    },
    {
      tipo: "numero_real",
      valor: 10.5,
    },
    {
      tipo: "checkbox",
      valor: true,
    },
    {
      tipo: "texto",
      valor: "Nova Propriedade",
    },
    {
      tipo: "data",
      valor: new Date("2024-05-16"),
    },
  ];

  describe.each(data)(`Tipo de Propriedade com Valor`, (item) => {
    it(`Deve retornar valor ${item.tipo} para tipo ${item.tipo}`, () => {
      const propriedade = PropriedadeBuilder.criar()
        .comTipo(item.tipo)
        .comValor(item.valor)
        .agora();
      expect(propriedade.tipo).toBe(item.tipo);
      expect(propriedade.valor).toBe(item.valor);
    });
  });

  test("Não deve criar propriedade com valor do tipo invalido", () => {
    Teste.comErro(
      () =>
        PropriedadeBuilder.criar()
          .comTipo("numero_inteiro")
          .comValor("teste")
          .agora(),
      {
        codigo: "TIPO_PROPRIEDADE_INVALIDO",
      }
    );
  });
});
