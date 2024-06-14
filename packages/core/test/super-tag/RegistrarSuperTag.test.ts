import RegistrarSuperTag from "../../src/super-tag/servicos/SalvarSuperTag";
import SuperTagPropriedadeBuilder from "../data/SuperTagPropriedadeBuilder";
import RepositorioSuperTagMock from "../mock/RepositorioSuperTagMock";

test("Deve cadastrar uma SuperTag", async () => {
  const repo = new RepositorioSuperTagMock();
  const casoDeUso = new RegistrarSuperTag(repo);
  const titulo = "Nova SuperTag";
  const emoji = {
    codigo: "1f423",
    url: "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png",
  };

  const propriedades = [
    SuperTagPropriedadeBuilder.criar()
      .comDescricao("propriedade 1")
      .comTipo("texto")
      .comValor("Valor 1")
      .agora().props,
    SuperTagPropriedadeBuilder.criar()
      .comDescricao("propriedade 2")
      .comTipo("numero_inteiro")
      .comValor(10)
      .agora().props,
  ];

  await casoDeUso.executar({ titulo, emoji, propriedades });

  expect(repo.obterPorTitulo(titulo)).toBeDefined();
});

test("Deve cadastrar uma SuperTag com valores padrão", async () => {
  const repo = new RepositorioSuperTagMock();
  const casoDeUso = new RegistrarSuperTag(repo);

  const propriedades = [
    SuperTagPropriedadeBuilder.criar()
      .comDescricao("propriedade 1")
      .comTipo("texto")
      .comValor("Valor 1")
      .agora().props,
    SuperTagPropriedadeBuilder.criar()
      .comDescricao("propriedade 2")
      .comTipo("numero_inteiro")
      .comValor(10)
      .agora().props,
  ];

  const superTag = await casoDeUso.executar({
    titulo: "Título Padrão",
    propriedades,
  });

  expect(superTag).toBeDefined();
  expect(superTag?.titulo).toBe("Título Padrão");
  expect(superTag?.emoji).toEqual({
    codigo: "1f423",
    url: "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png",
  });
  expect(superTag?.propriedades.todas.map((p) => p.props)).toEqual(
    propriedades
  );
});

test("Deve incluir uma SuperTag em outra criando relacionamento entre elas", async () => {
  const repo = new RepositorioSuperTagMock();
  const casoDeUso = new RegistrarSuperTag(repo);

  const superTagPai = await casoDeUso.executar({
    titulo: "SuperTag Pai",
    emoji: { codigo: "1f423", url: "Emoji Padrão" },
    propriedades: [],
  });

  if (superTagPai) {
    const propriedadesFilha = [
      SuperTagPropriedadeBuilder.criar()
        .comDescricao("propriedade filha 1")
        .comTipo("texto")
        .comValor("Valor filha 1")
        .agora().props,
    ];

    const superTagFilha = await casoDeUso.executar({
      titulo: "SuperTag Filha",
      emoji: { codigo: "1f424", url: "Emoji Filha" },
      propriedades: propriedadesFilha,
      chavePai: superTagPai.id.valor,
    });

    const superTagSalvaFilha = await repo.obterPorId(
      superTagFilha?.id.valor ?? ""
    );

    console.log(superTagPai);
    console.log(superTagSalvaFilha);

    expect(superTagSalvaFilha).toBeDefined();
    expect(superTagSalvaFilha?.titulo).toBe("SuperTag Filha");
    expect(superTagSalvaFilha?.emoji).toEqual({
      codigo: "1f424",
      url: "Emoji Filha",
    });
    expect(superTagSalvaFilha?.propriedades.todas.map((p) => p.props)).toEqual(
      propriedadesFilha
    );
    expect(superTagSalvaFilha?.chavePai?.valor).toBe(superTagPai.id.valor);
  } else {
    fail("SuperTag Pai não foi criada corretamente.");
  }
});
