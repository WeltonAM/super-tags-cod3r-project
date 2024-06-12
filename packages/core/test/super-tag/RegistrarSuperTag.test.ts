import RegistrarSuperTag from "../../src/super-tag/servicos/RegistrarSuperTag";
import RepositorioSuperTagMock from "../mock/RepositorioSuperTagMock";
import Propriedade from "../../src/super-tag/provedor/Propriedade";

test("Deve cadastrar uma SuperTag", async () => {
    const repo = new RepositorioSuperTagMock();
    const casoDeUso = new RegistrarSuperTag(repo);
    const titulo = "Nova SuperTag";
    const emoji = { codigo: "1f423", url: "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png" };

    const propriedades: Propriedade[] = [
        {
            descricao: 'propriedade 1',
            tipo: "texto",
            valor: "Valor 1"
        },
        {
            descricao: 'propriedade 1',
            tipo: "numero_inteiro",
            valor: 10
        },
    ];
    
    await casoDeUso.executar({ titulo, emoji, propriedades });

    expect(repo.obterPorTitulo(titulo)).toBeDefined()
});

test("Deve cadastrar uma SuperTag com valores padrão", async () => {
    const repo = new RepositorioSuperTagMock();
    const casoDeUso = new RegistrarSuperTag(repo);

    const propriedades: Propriedade[] = [
        {
            descricao: 'propriedade 1',
            tipo: "texto",
            valor: "Valor 1"
        },
        {
            descricao: 'propriedade 1',
            tipo: "numero_inteiro",
            valor: 10
        },
    ];

    const superTag = await casoDeUso.executar({ propriedades });

    expect(superTag).toBeDefined();
    expect(superTag.titulo).toBe("Título Padrão");
    expect(superTag.emoji).toEqual({ codigo: "1f423", url: "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png" });
    expect(superTag.propriedades).toEqual(propriedades);
});

test("Deve incluir uma SuperTag em outra criando relacionamento entre elas", async () => {
    const repo = new RepositorioSuperTagMock();
    const casoDeUso = new RegistrarSuperTag(repo);

    const superTagPai = await casoDeUso.executar({
        titulo: "SuperTag Pai",
        emoji: { codigo: "1f423", url: "Emoji Padrão" },
        propriedades: [],
    });

    const propriedadesFilha: Propriedade[] = [
        {
            descricao: "propriedade filha 1",
            tipo: "texto",
            valor: "Valor filha 1"
        },
    ];
    const superTagFilha = await casoDeUso.executar({
        titulo: "SuperTag Filha",
        emoji: { codigo: "1f424", url: "Emoji Filha" },
        propriedades: propriedadesFilha,

        chaveRelacionamento: superTagPai.id.valor,
    });

    const superTagSalvaFilha = await repo.obterPorId(superTagFilha.id.valor);

    console.log(superTagFilha)

    expect(superTagSalvaFilha).toBeDefined();
    expect(superTagSalvaFilha?.titulo).toBe("SuperTag Filha");
    expect(superTagSalvaFilha?.emoji).toEqual({ codigo: "1f424", url: "Emoji Filha" });
    expect(superTagSalvaFilha?.propriedades).toEqual(propriedadesFilha);
    expect(superTagSalvaFilha?.chaveRelacionamento?.valor).toBe(superTagPai.id.valor);
});