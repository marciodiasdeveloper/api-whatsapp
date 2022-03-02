interface IRequest {
  token: string;
  // guild_id: string;
  // channel_id: string;
}

interface IResponse {
  status: string;
  url: string;
}

export { IResponse, IRequest };
