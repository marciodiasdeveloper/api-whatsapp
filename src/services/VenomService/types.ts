interface IVenomSession {
  name: string;
  qrcode: string;
  client: string;
  status: string;
  state: string;
}

interface IVenomSessionName {
  name: string;
}

export { IVenomSession, IVenomSessionName };
