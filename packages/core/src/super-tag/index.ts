import SuperTag, { SuperTagProps } from "./modelo/SuperTag";
import RegistrarSuperTag from "./servicos/SalvarSuperTag";
import RepositorioSuperTag from "./provedor/RepositorioSuperTag";
import Emoji from "./modelo/Emoji";
import SuperTagPropriedade from "./modelo/SuperTagPropriedade";
import { SuperTagPropriedadeProps } from "./modelo/SuperTagPropriedade";

export type {
  SuperTagProps,
  RepositorioSuperTag,
  SuperTagPropriedadeProps,
  Emoji,
};
export { SuperTag, RegistrarSuperTag, SuperTagPropriedade };
