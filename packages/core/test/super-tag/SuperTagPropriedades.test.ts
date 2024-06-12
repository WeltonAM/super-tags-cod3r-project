import { SuperTagPropriedadeProps } from "../../src/super-tag/modelo/SuperTagPropriedade";
import SuperTagPropriedades from "../../src/super-tag/modelo/SuperTagPropriedades";

test("Deve incluir uma propriedade corretamente", () => {
  const prop1: SuperTagPropriedadeProps = {
    id: "1",
    descricao: "Propriedade 1",
    tipo: "texto",
    valor: "Valor 1",
  };
  const prop2: SuperTagPropriedadeProps = {
    id: "2",
    descricao: "Propriedade 2",
    tipo: "numero_inteiro",
    valor: 100,
  };

  const superTagProps = new SuperTagPropriedades([prop1]);

  expect(superTagProps.props.length).toBe(1);

  superTagProps.incluir([prop2]);

  expect(superTagProps.props.length).toBe(2);
});

test("Deve excluir uma propriedade corretamente", () => {
  const prop1: SuperTagPropriedadeProps = {
    id: "1",
    descricao: "Propriedade 1",
    tipo: "texto",
    valor: "Valor 1",
  };
  const prop2: SuperTagPropriedadeProps = {
    id: "2",
    descricao: "Propriedade 2",
    tipo: "numero_inteiro",
    valor: 100,
  };

  const superTagProps = new SuperTagPropriedades([prop1, prop2]);

  superTagProps.excluir("1");

  expect(superTagProps.props.length).toBe(1);
});
