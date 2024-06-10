import { SuperTag, SuperTagProps } from "../../src"
import { faker } from "@faker-js/faker"
import Emoji from "../../src/super-tag/provedor/Emoji"
import Propriedade from "../../src/super-tag/provedor/Propriedade"

export default class SuperTagBuilder {
    private constructor(private props: SuperTagProps) {}

    static criar() {
        return new SuperTagBuilder({
            titulo: faker.lorem.words(3),
            emoji: { emoji: "🌟", descricao: "Emoji Padrão" },
            propriedades: [],
        })
    }

    comId(id: string): SuperTagBuilder {
        this.props.id = id
        return this
    }

    semId(): SuperTagBuilder {
        this.props.id = undefined
        return this
    }

    comTitulo(titulo: string): SuperTagBuilder {
        this.props.titulo = titulo
        return this
    }

    semTitulo(): SuperTagBuilder {
        this.props.titulo = undefined
        return this
    }

    comEmoji(emoji: Emoji): SuperTagBuilder {
        this.props.emoji = emoji
        return this
    }

    semEmoji(): SuperTagBuilder {
        this.props.emoji = undefined
        return this
    }

    comPropriedades(propriedades: Propriedade[]): SuperTagBuilder {
        this.props.propriedades = propriedades
        return this
    }

    semPropriedades(): SuperTagBuilder {
        this.props.propriedades = []
        return this
    }

    agora(): SuperTag {
        return new SuperTag(this.props)
    }
}
