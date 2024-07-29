import Entidade from "../../compartilhado/Entidade";
import ListaEntidade from "../../compartilhado/ListaEntidade";

import SuperTag, { SuperTagProps } from "./SuperTag";

export default class SuperTags extends ListaEntidade<SuperTag, SuperTagProps> {
  clone(todas: SuperTagProps[]): ListaEntidade<SuperTag, SuperTagProps> {
    return new SuperTags(todas);
  }

  criarEntidade(item: SuperTagProps): Entidade<SuperTag, SuperTagProps> {
    return new SuperTag(item);
  }
}
