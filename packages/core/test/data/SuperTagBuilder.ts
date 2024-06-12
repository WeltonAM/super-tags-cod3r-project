import { SuperTag, SuperTagPropriedade, SuperTagProps, Emoji } from "../../src";
import { faker } from "@faker-js/faker";
import Id from "../../src/compartilhado/Id";

export default class SuperTagBuilder {
  private constructor(private props: SuperTagProps) {}

  static criar() {
    return new SuperTagBuilder({
      id: new Id().valor,
      titulo: faker.lorem.words(3),
      emoji: {
        codigo: "1f423",
        url: "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png",
      },
      propriedades: [],
      chaveFilha: undefined,
      chavePai: undefined,
      filhas: [],
    });
  }

  comId(id: string): SuperTagBuilder {
    this.props.id = id;
    return this;
  }

  semId(): SuperTagBuilder {
    this.props.id = undefined;
    return this;
  }

  comTitulo(titulo: string): SuperTagBuilder {
    this.props.titulo = titulo;
    return this;
  }

  semTitulo(): SuperTagBuilder {
    this.props.titulo = undefined;
    return this;
  }

  comEmoji(emoji: Emoji): SuperTagBuilder {
    this.props.emoji = emoji;
    return this;
  }

  semEmoji(): SuperTagBuilder {
    this.props.emoji = undefined;
    return this;
  }

  comPropriedades(propriedades: SuperTagPropriedade[]): SuperTagBuilder {
    this.props.propriedades = propriedades.map((p) => p.props);

    return this;
  }

  semPropriedades(): SuperTagBuilder {
    this.props.propriedades = [];
    return this;
  }

  comChaveFilha(chaveFilha: string): SuperTagBuilder {
    this.props.chaveFilha = chaveFilha;
    return this;
  }

  semChaveFilha(): SuperTagBuilder {
    this.props.chaveFilha = undefined;
    return this;
  }

  comChavePai(chavePai: string): SuperTagBuilder {
    this.props.chavePai = chavePai;
    return this;
  }

  semChavePai(): SuperTagBuilder {
    this.props.chavePai = undefined;
    return this;
  }

  comFilhas(filhas: SuperTagProps[]): SuperTagBuilder {
    this.props.filhas = filhas;
    return this;
  }

  semFilhas(): SuperTagBuilder {
    this.props.filhas = [];
    return this;
  }

  agora(): SuperTag {
    return new SuperTag(this.props);
  }
}
