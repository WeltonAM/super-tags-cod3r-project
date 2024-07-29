import Propriedades from "../../src/super-tag/modelo/Propriedades";
import PropriedadeBuilder from "../data/PropriedadeBuilder";

describe("Propriedades", () => {
  test("deve criar tags com array vazio", () => {
    const propriedades = new Propriedades([]);
    expect(propriedades.todas).toHaveLength(0);
  });

  test("deve criar as tags", () => {
    const propriedades = new Propriedades(PropriedadeBuilder.criarListaCom(6));
    expect(propriedades.todas).toHaveLength(6);
  });

  test("deve adicionar uma nova propriedade", () => {
    let propriedades = new Propriedades(PropriedadeBuilder.criarListaCom(6));
    const novaPropriedade = PropriedadeBuilder.criar().agora().props;
    propriedades = propriedades.adicionar(novaPropriedade);
    expect(propriedades.todas).toHaveLength(7);
    expect(propriedades.contem(novaPropriedade.id!)).toBeTruthy();
  });

  test("deve remover uma propriedade", () => {
    let propriedades = new Propriedades(PropriedadeBuilder.criarListaCom(6));
    const removePropriedade = propriedades.todas[3]!;
    expect(propriedades.contem(removePropriedade)).toBeTruthy();
    propriedades = propriedades.remover(removePropriedade);
    expect(propriedades.contem(removePropriedade)).toBeFalsy();
  });

  test("deve atualizar uma propriedade", () => {
    let propriedades = new Propriedades(PropriedadeBuilder.criarListaCom(6));
    const atualizaPropriedade = propriedades.todas[2]!.clone({
      descricao: "Titulo Atualizado",
    }).props;
    propriedades = propriedades.atualizar(atualizaPropriedade);
    expect(propriedades.todas[2]!.props).toEqual(atualizaPropriedade);
    expect(propriedades.todas[2]!.props.descricao).toBe(
      atualizaPropriedade.descricao
    );
  });
});
