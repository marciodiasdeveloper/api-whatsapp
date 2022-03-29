import fs from "fs";
import venom from "venom-bot";

import { IVenomSession, IVenomSessionName } from "./types";

class VenomService {
  public sessions: IVenomSession[];

  constructor() {
    this.sessions = [];
  }

  async start(sessionName: string) {
    let session = this.getSession(sessionName);

    if (!session) {
      session = await this.addSession(sessionName);
    }

    return session;
  }

  async getSession(sessionName: string) {
    let foundSession = false;

    if (this.sessions && this.sessions.length) {
      this.sessions.forEach((session) => {
        if (sessionName === session.name) {
          foundSession = session;
        }
      });
    }

    return foundSession;
  }

  async addSession(sessionName: string) {
    const newSession = {
      name: sessionName,
      qrcode: "",
      client: "",
      status: "notLogged",
      state: "STARTING",
    };
    this.sessions.push(newSession);
    console.log(`addSession newSession: ${newSession}`);

    newSession.client = this.initSession(sessionName);

    this.setup(sessionName);

    return newSession;
  }

  async initSession(sessionName) {
    const session = this.getSession(sessionName);

    const client = await venom.create(
      sessionName,
      (base64Qr) => {
        session.state = "QRCODE";
        session.qrcode = base64Qr;
        console.log(`new qrcode updated - session.state: ${session.state}`);
        // WebhookService.notifyApiSessionUpdate(session);
      },
      (statusFind) => {
        // console.log("statusFind", statusFind);
        session.status = statusFind;
        // console.log(`session.status: ${session.status}`);
        // WebhookService.notifyApiSessionUpdate(session);
      },
      {
        multidevice: true,
      }
    );

    return client;
  }

  async setup(sessionName) {
    const session = this.getSession(sessionName);

    console.log("setupSession", session);

    const connectionState = await session.client.getConnectionState();
  }

  async closeSession(sessionName): Promise<boolean> {
    return true;
  }

  async getSessions(): Promise<boolean> {
    return true;
  }

  async qrCode(): Promise<boolean> {
    return true;
  }

  async sendText(): Promise<boolean> {
    return true;
  }

  async sendTextGroup(): Promise<boolean> {
    return true;
  }
  async sendFile(): Promise<boolean> {
    return true;
  }
  async sendLinkPreview(): Promise<boolean> {
    return true;
  }
  async getAllChatsGroups(): Promise<boolean> {
    return true;
  }
  async checkPhone(): Promise<boolean> {
    return true;
  }
  async device(): Promise<boolean> {
    return true;
  }
}

export { VenomService };
