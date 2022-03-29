interface IRequest {
  sessionName: string;
}

interface IStartResponse {
  success: boolean;
  message: string;
  session: string;
}

interface ISessionName {
  sessionName: string;
}

export { IStartResponse, IRequest, ISessionName };
