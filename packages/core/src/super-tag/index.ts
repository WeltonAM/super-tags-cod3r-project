import SuperTag, { SuperTagProps } from "./modelo/SuperTag";
import RepositorioSuperTag from "./provedor/RepositorioSuperTag";
import { PropriedadeProps } from "./modelo/Propriedade";
import Propriedade, { PropriedadeTipo } from "./modelo/Propriedade";
import RegistrarSuperTag from "./servicos/RegistrarSuperTag";
import ObterSuperTags from "./servicos/ObterSuperTags";
import ObterSuperTagPorId from "./servicos/ObterSuperTagPorId";

export type {
  SuperTagProps,
  RepositorioSuperTag,
  PropriedadeProps,
  PropriedadeTipo,
};
export {
  SuperTag,
  RegistrarSuperTag,
  Propriedade,
  ObterSuperTags,
  ObterSuperTagPorId,
};
