interface IRequest {
  sessionName: string;
}

interface IStartResponse {
  success: boolean;
  message: string;
  session: string;
}

export { IStartResponse, IRequest };
