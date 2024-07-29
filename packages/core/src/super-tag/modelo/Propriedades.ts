import Entidade from "../../compartilhado/Entidade";
import ListaEntidade from "../../compartilhado/ListaEntidade";
import Propriedade, { PropriedadeProps } from "./Propriedade";

export default class Propriedades extends ListaEntidade<
  Propriedade,
  PropriedadeProps
> {
  clone(
    todas: PropriedadeProps[]
  ): ListaEntidade<Propriedade, PropriedadeProps> {
    return new Propriedades(todas);
  }

  criarEntidade(
    item: PropriedadeProps
  ): Entidade<Propriedade, PropriedadeProps> {
    return new Propriedade(item);
  }
}
