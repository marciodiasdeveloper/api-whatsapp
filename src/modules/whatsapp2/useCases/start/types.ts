interface IRequest {
  sessionName: string;
}

interface IStartResponse {
  success: boolean;
  message: string;
}

export { IStartResponse, IRequest };
