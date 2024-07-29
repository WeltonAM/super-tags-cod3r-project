import RepositorioSuperTag from "../provedor/RepositorioSuperTag";
import SuperTag from "../modelo/SuperTag";

export default class ObterSuperTags {
  constructor(private repo: RepositorioSuperTag) {}

  async executar(): Promise<SuperTag[]> {
    const superTags = await this.repo.obterTodos();
    return superTags;
  }
}
