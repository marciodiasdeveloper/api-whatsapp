import axios from "axios";
import Discord, { Intents, GuildChannel } from "discord.js";
import { inject, injectable } from "tsyringe";

import { IResponse } from "./types";

const clientAxios = axios.create({
  baseURL: "http://discord.com/api",
});

@injectable()
class StartUseCase {
  public async execute(
    token: string,
    guildId: string,
    channelId: string
  ): Promise<IResponse> {
    // const client = new Discord.Client({
    //   intents: [Intents.FLAGS.GUILDS],
    // });
    // await client.login(token);
    // const guild = await client.guilds.cache.get(guildId);
    // const channel = await guild.channels.cache.get(channelId);
    // const invite = await channel.createInvite({
    //   // maxUses: 1,
    //   unique: 1,
    // });
    // return { status: "success", url: `https://discord.gg/${invite}` };

    return true;
  }
}

export { StartUseCase };
