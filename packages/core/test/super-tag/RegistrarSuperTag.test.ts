import RegistrarSuperTag from "../../src/super-tag/servicos/RegistrarSuperTag"
import RepositorioSuperTagMock from "../mock/RepositorioSuperTagMock"
import Propriedade from "../../src/super-tag/provedor/Propriedade"
import Teste from "../util/Teste"

test("Deve cadastrar uma SuperTag", async () => {
    const repo = new RepositorioSuperTagMock()
    const casoDeUso = new RegistrarSuperTag(repo)
    const titulo = "Nova SuperTag"
    const emoji = { emoji: "🌟", descricao: "Emoji Padrão" }
    
    const propriedades: Propriedade[] = [
        { nome: "Propriedade 1", tipo: "texto", valor: "Valor 1" },
        { nome: "Propriedade 2", tipo: "numero_inteiro", valor: 10 },
    ]

    await casoDeUso.executar({ titulo, emoji, propriedades })
    
    const superTagSalva = await repo.obterPorTitulo(titulo)
    
    expect(superTagSalva).toBeDefined()
    expect(superTagSalva!.titulo).toBe(titulo)
    expect(superTagSalva!.emoji).toEqual(emoji)
    expect(superTagSalva!.propriedades).toEqual(propriedades)
})

test("Deve lançar erro com título inválido", async () => {
    const repo = new RepositorioSuperTagMock()
    const casoDeUso = new RegistrarSuperTag(repo)
    const titulo = "Nova"
    const emoji = { emoji: "🌟", descricao: "Emoji Padrão" }
    
    const propriedades: Propriedade[] = [
        { nome: "Propriedade 1", tipo: "texto", valor: "Valor 1" },
        { nome: "Propriedade 2", tipo: "numero_inteiro", valor: 10 },
    ]

    Teste.comErroSinc(() => casoDeUso.executar({ titulo, emoji, propriedades }), {
        codigo: "TITULO_INVALIDO",
    })
})
