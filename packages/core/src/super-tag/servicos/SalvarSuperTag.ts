import CasoDeUso from "../../compartilhado/CasoDeUso";
import SuperTagRepositorio from "../provedor/RepositorioSuperTag";
import SuperTag, { SuperTagProps } from "../modelo/SuperTag";
import Emoji from "../modelo/Emoji";
import { SuperTagPropriedadeProps } from "../modelo/SuperTagPropriedade";
import SuperTagPropriedades from "../modelo/SuperTagPropriedades";

export interface Entrada {
  titulo: string;
  emoji?: Emoji;
  propriedades?: SuperTagPropriedadeProps[];
  chaveFilha?: string;
  chavePai?: string;
  filhas?: Entrada[];
}

export default class SalvarSuperTag implements CasoDeUso<Entrada, SuperTag> {
  constructor(private repo: SuperTagRepositorio) {}

  async executar(dto: Entrada): Promise<SuperTag> {
    const { titulo, emoji, propriedades, chaveFilha, chavePai, filhas } = dto;

    const superTagProps: SuperTagProps = {
      titulo,
      emoji,
      propriedades,
      chaveFilha,
      chavePai,
      filhas,
    };

    const superTag = new SuperTag(superTagProps);

    return await this.repo.salvar(superTag);
  }
}

// alterarTitulo(novoTitulo: string): SuperTag {
//     return this.clone({ titulo: novoTitulo })
// }

// alterarEmoji(novoEmoji: Emoji): SuperTag {
//     return this.clone({ emoji: novoEmoji })
// }

// adicionarPropriedade(propriedade: Propriedade): SuperTag {
//     const novasPropriedades = [...this.propriedades, propriedade]

//     return this.clone({ propriedades: novasPropriedades })
// }

// editarPropriedade(nome: string, novoValor: any): SuperTag {
//     const propriedadesAtualizadas = this.propriedades.map(prop => {
//         if (prop.nome === nome) {
//             return { ...prop, valor: novoValor }
//         }
//         return prop
//     })

//     return this.clone({ propriedades: propriedadesAtualizadas })
// }

// excluirPropriedade(nome: string): SuperTag {
//     const propriedadesAtualizadas = this.propriedades.filter(prop => prop.nome !== nome)

//     return this.clone({ propriedades: propriedadesAtualizadas })
// }

// colapsarPropriedades(): SuperTag {
//     // Implemente a lógica para colapsar as propriedades se necessário
//     return this // Retorne o objeto SuperTag atual por enquanto
// }

// salvarAutomaticamente(): void {
//     // Implemente a lógica para salvar automaticamente no banco de dados
// }
