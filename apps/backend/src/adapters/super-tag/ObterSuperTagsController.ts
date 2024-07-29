import { Express } from "express";
import { ObterSuperTags } from "core";
import Erros from "../../util/Erro";

export default class ObterSuperTagsController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: ObterSuperTags,
    ...middleware: any[]
  ) {
    servidor.get("/supertags", ...middleware, async (req, res) => {
      try {
        const superTags = await casoDeUso.executar();
        res.status(200).json(superTags);
      } catch (e: any) {
        res.status(400).json({ erros: Erros.tratar(e) });
      }
    });
  }
}
