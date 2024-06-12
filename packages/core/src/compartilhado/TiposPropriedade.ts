import Validador from "./Validador";

export default class TiposPropriedade {
  readonly tipo:
    | "texto"
    | "numero_inteiro"
    | "numero_real"
    | "checkbox"
    | "data";

  constructor(tipo: string) {
    this.tipo = this.validarTipo(tipo);
  }

  private validarTipo(
    tipo: string
  ): "texto" | "numero_inteiro" | "numero_real" | "checkbox" | "data" {
    const tiposValidos = [
      "texto",
      "numero_inteiro",
      "numero_real",
      "checkbox",
      "data",
    ];
    if (tiposValidos.includes(tipo)) {
      return tipo as
        | "texto"
        | "numero_inteiro"
        | "numero_real"
        | "checkbox"
        | "data";
    } else {
      Validador.lancarErro("TIPO_PROPRIEDADE_INVALIDO");
    }
  }
}
