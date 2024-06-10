import CasoDeUso from "../../compartilhado/CasoDeUso"
import SuperTagRepositorio from "../provedor/SuperTagRepositorio"
import SuperTag, { SuperTagProps } from "../modelo/SuperTag"
import Emoji from "../provedor/Emoji"
import Propriedade from "../provedor/Propriedade"

export interface Entrada {
    titulo?: string
    emoji?: Emoji
    propriedades?: Propriedade[]
}

export default class RegistrarSuperTag implements CasoDeUso<Entrada, void> {
    constructor(private repo: SuperTagRepositorio) {}

    async executar(dto: Entrada): Promise<void> {
        const superTagProps: SuperTagProps = {
            titulo: dto.titulo,
            emoji: dto.emoji,
            propriedades: dto.propriedades,
        }

        const superTag = new SuperTag(superTagProps)
        await this.repo.salvar(superTag)
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