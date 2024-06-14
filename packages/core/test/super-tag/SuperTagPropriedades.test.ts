import SuperTagPropriedades from "../../src/super-tag/modelo/SuperTagPropriedades";
import SuperTagPropriedadeBuilder from "../data/SuperTagPropriedadeBuilder";

test("Deve incluir uma propriedade corretamente", () => {
  const prop1 = SuperTagPropriedadeBuilder.criar()
    .comDescricao("Propriedade 1")
    .comTipo("texto")
    .comValor("Valor 1")
    .agora();

  const prop2 = SuperTagPropriedadeBuilder.criar()
    .comDescricao("Propriedade 2")
    .comTipo("numero_inteiro")
    .comValor(100)
    .agora();

  const superTagProps = new SuperTagPropriedades([prop1.props]);

  expect(superTagProps.props.length).toBe(1);

  superTagProps.incluir([prop2.props]);

  expect(superTagProps.props.length).toBe(2);
});

test("Deve excluir uma propriedade corretamente", () => {
  const prop1 = SuperTagPropriedadeBuilder.criar()
    .comDescricao("Propriedade 1")
    .comTipo("texto")
    .comValor("Valor 1")
    .agora();

  const prop2 = SuperTagPropriedadeBuilder.criar()
    .comDescricao("Propriedade 2")
    .comTipo("numero_inteiro")
    .comValor(100)
    .agora();

  const superTagProps = new SuperTagPropriedades([prop1.props, prop2.props]);

  const prop1Id = superTagProps.todas[0]?.id.valor;

  if (!prop1Id) {
    throw new Error("ID da primeira propriedade está indefinido");
  }

  superTagProps.excluir(prop1Id);

  expect(superTagProps.props.length).toBe(1);
  expect(superTagProps.props[0]!.descricao).toBe("Propriedade 2");
});
