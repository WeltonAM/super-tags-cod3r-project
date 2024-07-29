import Entidade, { EntidadeProps } from "../../compartilhado/Entidade";
import Validador from "../../compartilhado/Validador";

export type PropriedadeTipo =
  | "texto"
  | "numero_inteiro"
  | "numero_real"
  | "checkbox"
  | "data";
export type PropriedadeValorTipo = string | number | boolean | Date | undefined;
export interface PropriedadeProps extends EntidadeProps {
  descricao?: string;
  tipo?: PropriedadeTipo;
  valor?: PropriedadeValorTipo;
}

export default class Propriedade extends Entidade<
  Propriedade,
  PropriedadeProps
> {
  readonly descricao: string;
  readonly tipo: PropriedadeTipo;
  readonly valor: PropriedadeValorTipo;

  constructor(props: PropriedadeProps) {
    super(props);
    this.descricao = props.descricao ?? "";
    this.tipo = props.tipo ?? "texto";
    this.valor = this.setValor(props.tipo ?? "texto", props.valor);
  }

  protected setValor(
    tipo: PropriedadeTipo,
    valor: PropriedadeValorTipo
  ): PropriedadeValorTipo {
    switch (tipo) {
      case "texto":
        return typeof valor === "string" ? valor : "";
      case "numero_inteiro":
        return typeof valor === "number" ? Math.floor(valor) : 0;
      case "numero_real":
        return typeof valor === "number" ? valor : 0;
      case "checkbox":
        return typeof valor === "boolean" ? valor : false;
      case "data":
        return valor instanceof Date ? valor : new Date();
      default:
        Validador.lancarErro("TIPO_PROPRIEDADE_INVALIDO");
    }
  }
}
