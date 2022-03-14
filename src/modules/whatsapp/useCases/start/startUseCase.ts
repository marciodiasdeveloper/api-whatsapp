import { inject, injectable } from "tsyringe";

import { ISessionName } from "./types";

@injectable()
class StartUseCase {
  public async execute(sessionName: string): Promise<ISessionName> {
    return {
      sessionName: "Conexão com WhatsApp realizada com sucesso!",
      state: sessionName,
    };
  }
}

export { StartUseCase };
