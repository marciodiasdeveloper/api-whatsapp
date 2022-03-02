import { Request, Response } from "express";
import { container } from "tsyringe";

import { StartUseCase } from "./startUseCase";
import { IRequest, IResponse } from "./types";

class StartController {
  async handle(
    request: Request<unknown, unknown, IRequest>,
    response: Response
  ): Promise<IResponse[]> {
    const { sessionName } = request.body;
    const startUseCase = container.resolve(StartUseCase);

    const startSession = await startUseCase.execute(sessionName);

    return response.status(201).json(startSession);
  }
}

export { StartController };
