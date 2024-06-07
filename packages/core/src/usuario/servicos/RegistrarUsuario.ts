import CasoDeUso from "../../compartilhado/CasoDeUso"
import Email from "../../compartilhado/Email"
import NomePessoa from "../../compartilhado/NomePessoa"
import ProvedorCriptografia from "../provedor/ProvedorCriptografia"
import RepositorioUsuario from "../provedor/RepositorioUsuario"
import SenhaForte from "../../compartilhado/SenhaForte"
import Usuario from "../modelo/Usuario"
import Validador from "../../compartilhado/Validador"

export type Entrada = {
    nome: string
    email: string
    senha: string
}

export default class RegistrarUsuario implements CasoDeUso<Entrada, void> {
    constructor(
        private repo: RepositorioUsuario,
        private provedorCripto: ProvedorCriptografia,
    ) {}

    async executar(dto: Entrada): Promise<void> {
        const nome = new NomePessoa(dto.nome, "nome")
        const email = new Email(dto.email, "email")
        const senha = new SenhaForte(dto.senha, "senha")

        const senhaCripto = this.provedorCripto.criptografar(senha.valor)

        const usuarioExistente = await this.repo.obterPorEmail(email.valor)
        Validador.valor(usuarioExistente).nulo("USUARIO_JA_EXISTE").lancarSeErro()

        const usuario: Usuario = new Usuario({
            nome: nome.completo,
            email: email.valor,
            senha: senhaCripto,
        })

        await this.repo.salvar(usuario)
    }
}
