import CasoDeUso from "../../compartilhado/CasoDeUso"
import ProvedorCriptografia from "../provedor/ProvedorCriptografia"
import RepositorioUsuario from "../provedor/RepositorioUsuario"
import Validador from "../../compartilhado/Validador"
import Email from "../../compartilhado/Email"
import Usuario from "../modelo/Usuario"

export type Entrada = { email: string; senha: string }

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
    constructor(
        private repo: RepositorioUsuario,
        private provedorCripto: ProvedorCriptografia,
    ) {}

    async executar(entrada: Entrada): Promise<Usuario> {
        const email = new Email(entrada.email, "email")
        const usuario = await this.repo.obterPorEmail(email.valor)

        if (!usuario) Validador.lancarErro("USUARIO_NAO_EXISTE")

        const mesmaSenha = this.provedorCripto.comparar(
            entrada.senha,
            usuario.senha!.valor,
        )

        if (!mesmaSenha) Validador.lancarErro("SENHA_INCORRETA")
        return usuario.semSenha()
    }
}
