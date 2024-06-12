import Entidade, { EntidadeProps } from "../../compartilhado/Entidade";
import TextoSimples from "../../compartilhado/TextoSimples";
import TiposPropriedade from "../../compartilhado/TiposPropriedade";

export interface SuperTagPropriedadeProps extends EntidadeProps {
  descricao?: string;
  tipo?: string;
  valor?: any;
}
export default class SuperTagPropriedade extends Entidade<
  SuperTagPropriedade,
  SuperTagPropriedadeProps
> {
  readonly descricao: TextoSimples;
  readonly tipo: TiposPropriedade;
  readonly valor: any;

  constructor(props: SuperTagPropriedadeProps) {
    super(props);

    this.descricao = new TextoSimples(
      props.descricao!,
      3,
      80,
      "nome",
      "descrição"
    );

    this.tipo = new TiposPropriedade("texto");
    this.valor = props.valor ?? null;
  }
}
