import SuperTag, { SuperTagProps } from "./modelo/SuperTag"
import RegistrarSuperTag from "./servicos/RegistrarSuperTag"
import RepositorioSuperTag from "./provedor/RepositorioSuperTag"
import Propriedade from "./provedor/Propriedade"
import Emoji from "./provedor/Emoji"

export type { SuperTagProps, RepositorioSuperTag, Propriedade, Emoji }
export { SuperTag, RegistrarSuperTag }
