import { inject, injectable } from "tsyringe";

import { IStartResponse } from "./types";

@injectable()
class StartUseCase {
  public async execute(sessionName: string): Promise<IStartResponse> {
    return {
      success: true,
      message: "Conexão com WhatsApp realizada com sucesso!",
      session: sessionName,
    };
  }
}

export { StartUseCase };
