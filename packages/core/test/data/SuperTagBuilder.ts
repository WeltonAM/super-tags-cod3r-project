import { SuperTag, SuperTagProps } from "../../src";
import { faker } from "@faker-js/faker";
import { PropriedadeProps } from "../../src/super-tag/modelo/Propriedade";

export default class SuperTagBuilder {
  private constructor(private props: SuperTagProps) {}

  static criar() {
    return new SuperTagBuilder({
      titulo: faker.lorem.words(3),
      emoji: "👨‍💻",
      propriedades: [],
    });
  }

  static criarListaCom(qtde: number): SuperTagProps[] {
    const superTag = (i: number) => SuperTagBuilder.criar().agora().props;
    return Array.from({ length: qtde }).map((_, i) => superTag(i));
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

  comEmoji(emoji: string): SuperTagBuilder {
    this.props.emoji = emoji;
    return this;
  }

  semEmoji(): SuperTagBuilder {
    this.props.emoji = undefined;
    return this;
  }

  comPropriedades(propriedades: PropriedadeProps[]): SuperTagBuilder {
    this.props.propriedades = propriedades;
    return this;
  }

  semPropriedades(): SuperTagBuilder {
    this.props.propriedades = undefined;
    return this;
  }

  comChavePai(chavePai: string) {
    this.props.chavePai = chavePai;
    return this;
  }

  semChavePai() {
    this.props.chavePai = undefined;
    return this;
  }

  comFilhas(filhas: SuperTagProps[]) {
    this.props.filhas = filhas;
    return this;
  }

  semFilhas() {
    this.props.filhas = [];
    return this;
  }

  agora(): SuperTag {
    return new SuperTag(this.props);
  }
}
