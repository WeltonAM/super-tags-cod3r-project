import { ObterSuperTagPorId } from "../../src";
import Id from "../../src/compartilhado/Id";
import SuperTagBuilder from "../data/SuperTagBuilder";
import RepositorioSuperTagMock from "../mock/RepositorioSuperTagMock";

test("Deve executar ObterSuperTagPorId com id inválido", async () => {
  const casoDeUso = new ObterSuperTagPorId(new RepositorioSuperTagMock());
  const novaSuperTag = await casoDeUso.executar("123");
  expect(novaSuperTag).toBeNull();
});

test("Deve executar ObterSuperTagPorId com id válido", async () => {
  const casoDeUso = new ObterSuperTagPorId(new RepositorioSuperTagMock());
  const novaSuperTag = await casoDeUso.executar(Id.novo.valor);
  expect(novaSuperTag).toBeNull();
});

test("Deve retornar superTag com id existente", async () => {
  const id = Id.novo.valor;
  const repositorio = new RepositorioSuperTagMock([
    SuperTagBuilder.criar().comId(id).agora(),
  ]);
  const casoDeUso = new ObterSuperTagPorId(repositorio);
  const novaSuperTag = await casoDeUso.executar(id);
  expect(novaSuperTag).toBeDefined();
});
