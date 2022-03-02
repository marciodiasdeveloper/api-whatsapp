import { inject, injectable } from "tsyringe";

import { IResponse } from "./types";

@injectable()
class StartUseCase {
  public async execute(sessionName: string): Promise<IResponse> {
    return { success: true };
  }
}

export { StartUseCase };
