import dotenv from "dotenv";
dotenv.config();

import {
  LoginUsuario,
  ObterSuperTagPorId,
  ObterSuperTags,
  RegistrarUsuario,
} from "core";
import app from "./externo/api/config";
import LoginUsuarioController from "./adapters/usuario/LoginUsuarioController";
import ProvedorBcrypt from "./externo/auth/ProvedorBcrypt";
import ProvedorJWT from "./externo/auth/ProvedorJWT";
import RegistrarUsuarioController from "./adapters/usuario/RegistrarUsuarioController";
import RepositorioUsuarioPrismaPg from "./externo/db/RepositorioUsuarioPrismaPg";
import RepositorioSuperTagPrismaPg from "./externo/db/RepositorioSuperTagPrismaPg";
import UsuarioMiddleware from "./adapters/usuario/UsuarioMiddleware";
import ObterSuperTagsController from "./adapters/super-tag/ObterSuperTagsController";
import ObterSuperTagPorIdController from "./adapters/super-tag/ObterSuperTagPorIdController";

// ------------------------------- Dependências

const provedorToken = new ProvedorJWT(process.env.JWT_SECRET!);
const provedorCriptografia = new ProvedorBcrypt();
const repositorioUsuario = new RepositorioUsuarioPrismaPg();
const repositorioSuperTag = new RepositorioSuperTagPrismaPg();

// ------------------------------- Rotas abertas

const registrarUsuario = new RegistrarUsuario(
  repositorioUsuario,
  provedorCriptografia
);
new RegistrarUsuarioController(app, registrarUsuario);

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCriptografia);
new LoginUsuarioController(app, loginUsuario, provedorToken);

// ------------------------------- Rotas fechadas

const usuarioMiddleware = UsuarioMiddleware({
  repositorioUsuario,
  provedorToken,
});

const obterSuperTags = new ObterSuperTags(repositorioSuperTag);
new ObterSuperTagsController(app, obterSuperTags, usuarioMiddleware);

const obterSuperTagPorId = new ObterSuperTagPorId(repositorioSuperTag);
new ObterSuperTagPorIdController(app, obterSuperTagPorId, usuarioMiddleware);
