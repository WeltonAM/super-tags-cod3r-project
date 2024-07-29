import CasoDeUso from "../../compartilhado/CasoDeUso";
import SuperTagRepositorio from "../provedor/SuperTagRepositorio";
import SuperTag, { SuperTagProps } from "../modelo/SuperTag";
import Propriedade from "../modelo/Propriedade";

export interface Entrada {
  titulo?: string;
  emoji?: string;
  propriedades?: Propriedade[];
}

export default class RegistrarSuperTag implements CasoDeUso<Entrada, void> {
  constructor(private repo: SuperTagRepositorio) {}

  async executar(dto: Entrada): Promise<void> {
    const propriedades = dto.propriedades?.map(
      (propriedade) => propriedade.props
    );
    const superTagProps: SuperTagProps = {
      titulo: dto.titulo,
      emoji: dto.emoji,
      propriedades,
    };

    const superTag = new SuperTag(superTagProps);
    await this.repo.salvar(superTag);
  }
}
