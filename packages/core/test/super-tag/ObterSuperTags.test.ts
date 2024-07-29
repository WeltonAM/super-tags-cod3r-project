import { ObterSuperTags, SuperTag, SuperTagProps } from "../../src";
import SuperTagBuilder from "../data/SuperTagBuilder";
import RepositorioSuperTagMock from "../mock/RepositorioSuperTagMock";

describe("ObterSuperTags Caso de Uso", () => {
  const repoMock = new RepositorioSuperTagMock();
  const casoDeUso = new ObterSuperTags(repoMock);

  afterEach(() => {
    repoMock.limpar();
  });

  it("deve obter todas as SuperTags corretamente", async () => {
    const propriedades = [
      {
        descricao: "Descrição da Propriedade 1",
        tipo: "texto",
        valor: "Valor 1",
      },
      {
        descricao: "Descrição da Propriedade 2",
        tipo: "numero_inteiro",
        valor: 42,
      },
      {
        descricao: "Descrição da Propriedade 3",
        tipo: "checkbox",
        valor: true,
      },
    ];

    const superTags: SuperTag[] = [
      SuperTagBuilder.criar().agora(),
      SuperTagBuilder.criar().agora(),
      SuperTagBuilder.criar().agora(),
    ];

    superTags.forEach((superTag) => repoMock.salvar(superTag));

    const resultado = await casoDeUso.executar();

    expect(resultado).toHaveLength(3);
  });

  it("deve retornar uma lista vazia quando não houver SuperTags", async () => {
    const resultado = await casoDeUso.executar();

    expect(resultado).toHaveLength(0);
  });
});
