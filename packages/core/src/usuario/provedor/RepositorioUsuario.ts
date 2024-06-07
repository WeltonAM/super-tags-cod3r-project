import Usuario from "../modelo/Usuario"

export default interface RepositorioUsuario {
    salvar(usuario: Usuario): Promise<Usuario>
    obterPorEmail(email: string): Promise<Usuario | null>
}
