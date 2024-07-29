import SuperTags from "../../src/super-tag/modelo/SuperTags";
import SuperTagBuilder from "../data/SuperTagBuilder";

describe("SuperTags", () => {
  test("deve criar tags com array vazio", () => {
    const superTags = new SuperTags([]);
    expect(superTags.todas).toHaveLength(0);
  });

  test("deve criar as tags", () => {
    const superTags = new SuperTags(SuperTagBuilder.criarListaCom(6));
    expect(superTags.todas).toHaveLength(6);
  });

  test("deve adicionar uma nova superTag", () => {
    let superTags = new SuperTags(SuperTagBuilder.criarListaCom(6));
    const novaSuperTag = SuperTagBuilder.criar().agora().props;
    superTags = superTags.adicionar(novaSuperTag);
    expect(superTags.todas).toHaveLength(7);
    expect(superTags.contem(novaSuperTag.id!)).toBeTruthy();
  });

  test("deve remover uma superTag", () => {
    let superTags = new SuperTags(SuperTagBuilder.criarListaCom(6));
    const removeTag = superTags.todas[3]!;
    expect(superTags.contem(removeTag)).toBeTruthy();
    superTags = superTags.remover(removeTag);
    expect(superTags.contem(removeTag)).toBeFalsy();
  });

  test("deve atualizar uma superTag", () => {
    let superTags = new SuperTags(SuperTagBuilder.criarListaCom(6));
    const atualizaTag = superTags.todas[2]!.clone({
      titulo: "Titulo Atualizado",
    }).props;
    superTags = superTags.atualizar(atualizaTag);
    expect(superTags.todas[2]!.props).toEqual(atualizaTag);
    expect(superTags.todas[2]!.props.titulo).toBe(atualizaTag.titulo);
  });
});
