import { Request, Response } from "express";
import { container } from "tsyringe";

import { StartUseCase } from "./startUseCase";
import { IRequest, IResponse } from "./types";

class StartController {
  async handle(
    request: Request<unknown, unknown, IRequest>,
    response: Response
  ): Promise<IResponse> {
    // const inviteUseCase = container.resolve(InviteUseCase);
    // const { token, guild_id, channel_id } = request.body;
    // if (token && guild_id && channel_id) {
    //   const clientLogin = await inviteUseCase.execute(
    //     token,
    //     guild_id,
    //     channel_id
    //   );
    //   return response.status(201).json(clientLogin);
    // }
    // return response.status(401).json({});
  }
}

export { StartController };
