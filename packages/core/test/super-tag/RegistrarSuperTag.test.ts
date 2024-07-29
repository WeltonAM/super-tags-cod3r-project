import { RegistrarSuperTag } from "../../src";
import RepositorioSuperTagMock from "../mock/RepositorioSuperTagMock";
import PropriedadeBuilder from "../data/PropriedadeBuilder";
import Propriedade from "../../src/super-tag/modelo/Propriedade";

test("Deve cadastrar uma SuperTag", async () => {
  const repo = new RepositorioSuperTagMock();
  const casoDeUso = new RegistrarSuperTag(repo);
  const titulo = "Nova SuperTag";
  const emoji = "👨‍💻";
  const propriedadeProps = PropriedadeBuilder.criarListaCom(5);

  const propriedades = propriedadeProps.map((item) => new Propriedade(item));

  await casoDeUso.executar({ titulo, emoji, propriedades });

  const superTagSalva = await repo.obterPorTitulo(titulo);

  expect(superTagSalva).toBeDefined();
  expect(superTagSalva?.titulo).toBe(titulo);
  expect(superTagSalva?.emoji).toEqual(emoji);
  expect(superTagSalva?.propriedades.todas).toEqual(propriedades);
});
