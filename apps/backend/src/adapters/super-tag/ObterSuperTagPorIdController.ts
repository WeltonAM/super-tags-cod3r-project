import { ObterSuperTagPorId } from "core";
import { Express } from "express";
import Erros from "../../util/Erro";

export default class ObterSuperTagPorIdController {
  constructor(
    readonly servidor: Express,
    readonly casoDeUso: ObterSuperTagPorId,
    ...middleware: any[]
  ) {
    servidor.get("/supertag/:id", ...middleware, async (req, res) => {
      try {
        const superTag = await casoDeUso.executar(req.params.id);

        res.json(superTag);
      } catch (e: any) {
        res.status(400).json({ erros: Erros.tratar(e) });
      }
    });
  }
}
