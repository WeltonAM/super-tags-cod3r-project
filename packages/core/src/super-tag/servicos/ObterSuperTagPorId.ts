import CasoDeUso from "../../compartilhado/CasoDeUso";
import SuperTag from "../modelo/SuperTag";
import RepositorioSuperTag from "../provedor/SuperTagRepositorio";
import Validador from "../../compartilhado/Validador";

export default class ObterSuperTagPorId
  implements CasoDeUso<string, SuperTag | null>
{
  constructor(private readonly repo: RepositorioSuperTag) {}

  async executar(id: string): Promise<SuperTag | null> {
    if (Validador.valor(id).uuid().invalido) return null;
    const superTag = await this.repo.obterPorId(id);

    return superTag;
  }
}
