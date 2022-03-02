interface IRequest {
  sessionName: string;
}

interface IResponse {
  success: boolean;
  message: string;
}

export { IResponse, IRequest };
