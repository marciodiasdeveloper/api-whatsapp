import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { StartUseCase } from "./startUseCase";
import { IRequest, IStartResponse } from "./types";

@injectable()
class StartController {
  constructor() {}
  async handle(
    request: Request<unknown, unknown, IRequest>,
    response: Response
  ): Promise<Response> {
    const { sessionName } = request.query;
    const startUseCase = container.resolve(StartUseCase);

    const startSession = await startUseCase.execute(sessionName);

    return response.status(201).json(startSession);
  }
}

export { StartController };
