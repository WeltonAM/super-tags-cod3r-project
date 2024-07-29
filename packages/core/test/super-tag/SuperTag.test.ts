import Id from "../../src/compartilhado/Id";
import PropriedadeBuilder from "../data/PropriedadeBuilder";
import SuperTagBuilder from "../data/SuperTagBuilder";

describe("SuperTags", () => {
  test("deve criar uma SuperTag com titulo", () => {
    const titulo = "Nova Super tag";
    const superTag = SuperTagBuilder.criar()
      .semPropriedades()
      .comTitulo(titulo)
      .agora();
    expect(superTag.titulo).toBe(titulo);
    expect(superTag.id).toBeDefined();
  });

  test("deve criar uma SuperTag com titulo Padrão", () => {
    const superTag = SuperTagBuilder.criar().semTitulo().agora();
    expect(superTag.titulo).toBeDefined();
    expect(superTag.titulo).toBe("Título Padrão");
  });

  test("deve criar uma SuperTag com propriedades", () => {
    const propriedades = PropriedadeBuilder.criarListaCom(3);
    const superTag = SuperTagBuilder.criar()
      .comPropriedades(propriedades)
      .agora();
    expect(superTag.propriedades.todas.length).toBe(3);
    expect(superTag.propriedades.props).toEqual(propriedades);
  });

  test("deve criar uma SuperTag com emoji", () => {
    const emoji = "👨‍💻";
    const superTag = SuperTagBuilder.criar().comEmoji(emoji).agora();
    expect(superTag.emoji).toBe(emoji);
  });

  test("deve criar uma SuperTag com emoji padrão", () => {
    const superTag = SuperTagBuilder.criar().semEmoji().agora();
    expect(superTag.emoji).toBeDefined();
    expect(superTag.emoji).toEqual("👨‍💻");
  });

  test("deve criar uma SuperTag com Pai", () => {
    const chavePai = new Id().valor;
    const superTag = SuperTagBuilder.criar().comChavePai(chavePai).agora();
    expect(superTag.chavePai?.valor).toBe(chavePai);
  });

  test("deve criar uma SuperTag com suas filhas", () => {
    const filhas = SuperTagBuilder.criarListaCom(6);
    const superTag = SuperTagBuilder.criar().comFilhas(filhas).agora();
    expect(superTag.filhas.todas.length).toBe(6);
    expect(superTag.filhas.props).toEqual(filhas);
  });
});
