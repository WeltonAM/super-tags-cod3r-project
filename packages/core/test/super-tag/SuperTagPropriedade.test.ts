import SuperTagPropriedadeBuilder from "../data/SuperTagPropriedadeBuilder";

test("Deve criar uma SuperTagPropriedade corretamente", () => {
  const superTagPropriedade = SuperTagPropriedadeBuilder.criar()
    .comDescricao("Descrição da propriedade")
    .comTipo("texto")
    .comValor("Valor da propriedade")
    .agora();

  expect(superTagPropriedade.id).toBe("1");
  expect(superTagPropriedade.descricao).toBe("Descrição da propriedade");
  expect(superTagPropriedade.tipo.tipo).toBe("texto");
  expect(superTagPropriedade.valor).toBe("Valor da propriedade");
});

test("Deve criar uma SuperTagPropriedade com tipo padrão 'texto'", () => {
  const superTagPropriedade = SuperTagPropriedadeBuilder.criar()
    .comDescricao("Descrição da propriedade")
    .comValor("Valor da propriedade")
    .agora();

  expect(superTagPropriedade.tipo.tipo).toBe("texto");
});
