import venom from "venom-bot";

class VenomService {
  static async start(sessionName) {
    VenomService.sessions = VenomService.sessions || []; // start array

    let session = VenomService.getSession(sessionName);

    if (session == false) {
      session = await VenomService.addSesssion(sessionName);
    } else if (["CLOSED"].includes(session.state)) {
      console.log("session.state == CLOSED");
      session.state = "STARTING";
      session.status = "notLogged";
      session.client = VenomService.initSession(sessionName);

      VenomService.setup(sessionName);
    } else if (
      ["CONFLICT", "UNPAIRED", "UNLAUNCHED"].includes(session.state) || ["isLogged"].includes(session.status);
    ) {
      session.client.then((client) => {
        client.useHere();
      });
    } else {
      console.log(`session.state: ${session.state}`);
    }

    return session;
  }

  static async addSesssion(sessionName) {
    const newSession = {
      name: sessionName,
      qrcode: false,
      client: false,
      status: "notLogged",
      state: "STARTING",
    };
    VenomService.VenomService.push(newSession);
    console.log(`newSession.state: ${newSession.state}`);

    // setup session
    newSession.client = VenomService.initSession(sessionName);
    VenomService.setup(sessionName);

    return newSession;
  } // addSession

  static async initSession(sessionName) {
    let session = VenomService.getSession(sessionName);

    const client = await venom.create(
        sessionName,
        (base64Qr) => {
          session.state = "QRCODE";
                      session.qrcode = base64Qr;
                      console.log("new qrcode updated - session.state: " + session.state);
                      WebhookService.notifyApiSessionUpdate(session);
                  },
                  (statusFind) => {
                      console.log('statusFind', statusFind);
                      session.status = statusFind;
                      console.log("session.status: " + session.status);
                      WebhookService.notifyApiSessionUpdate(session);
                  },
                  {
          multidevice: true,
                  },
              );
    return client;
} //initSession

static async setup(sessionName) {

    let session = VenomService.getSession(sessionName);

console.log('session', session);

//	let connectionState = await session.client.getConnectionState();

//	console.log('state do client', connectionState);
    await session.client.then(client => {

//		console.log('state do client', client.getConnectionState());

client.onStateChange(state => {
            session.state = state;
            WebhookService.notifyApiSessionUpdate(session);
            console.log("session.state: " + state);
        });

    let time = 0;
client.onStreamChange((state) => {
    console.log('State Connection Stream: ' + state);
    clearTimeout(time);
  session.state = state;
  WebhookService.notifyApiSessionUpdate(session);
    if (state === 'DISCONNECTED' || state === 'SYNCING') {
          time = setTimeout(() => {
              client.close();
            }, 80000);
      }
});

        client.onStateChange(state => {
      console.log('onStateChange', state);
  });

client.onMessage(async (message) => {
            console.log('received message');
            try {
                if (message.body === 'hi') {
                    client.sendText(message.from, 'Hello\nfriend!');
                } else if (message.body == '!ping') {
                  client.sendText(message.from, 'pong');
                } else if (message.body == '!ping reply') {
                  client.reply(message.from, 'pong', message.id.toString());
                } else if (message.body == '!chats') {
                  const chats = await client.getAllChats();
                  client.sendText(message.from, `The bot has ${chats.length} chats open.`);
                } else if (message.body == '!groups') {
                  const groups = await client.getAllChatsGroups();
                  client.sendText(message.from, `The bot has ${groups.length} groups open.`);
                }
            } catch (e) {
                console.log(e);
            }

        });

        client.onAck(ack => {
            console.log("ack: " + ack);
        });

    });
}//setup

static async closeSession(sessionName) {
    let session = VenomService.getSession(sessionName);
    if (session) { //só adiciona se não existir
        WebhookService.notifyApiSessionUpdate(session);
        if (session.state != "CLOSED") {
            if (session.client)
                await session.client.then(async client => {
                    try {
                        await client.close();
                    } catch (error) {
                        console.log("client.close(): " + error.message);
                    }
                    session.state = "CLOSED";
                    session.client = false;
                    WebhookService.notifyApiSessionUpdate(session);
                    console.log("client.close - session.state: " + session.state);
                });
                WebhookService.notifyApiSessionUpdate(session);
            return { result: "success", message: "CLOSED" };
        } else {//close
            WebhookService.notifyApiSessionUpdate(session);
            return { result: "success", message: session.state };
        }
    } else {
        return { result: "error", message: "NOTFOUND" };
    }
}//close

static getSession(sessionName) {

    let foundSession = false;

    if (VenomService.sessions) {
        VenomService.VenomService.forEach(session => {
            if (sessionName == session.name) {
                foundSession = session;
            }
        });
    }

    // if(foundSession.state && foundSession.state === 'CONNECTED') {
    //     let device = await VenomService.device(foundSession.name);
    //     if(device.result === 'success') {
    //         foundSession.device = {
    //             phone: device.data.wid.user,
    //             connected: device.data.wid.connected,
    //             battery: device.data.wid.battery,
    //         }
    //     }
    // }

    return foundSession;
}//getSession

static getSessions() {
    if (VenomService.sessions) {
        return VenomService.sessions;
    } else {
        return [];
    }
}//getSessions

static async getQrcode(sessionName) {
    let session = VenomService.getSession(sessionName);
    if (session) {
        // if (["UNPAIRED", "UNPAIRED_IDLE"].includes(session.state)) {
        if (["UNPAIRED_IDLE"].includes(session.state)) {
            //restart session
            await VenomService.closeSession(sessionName);
            VenomService.start(sessionName);

            WebhookService.notifyApiSessionUpdate(session);

            return { result: "error", message: session.state };
        } else if (["CLOSED"].includes(session.state)) {
            VenomService.start(sessionName);
            WebhookService.notifyApiSessionUpdate(session);
            return { result: "error", message: session.state };
        } else { //CONNECTED
            if (session.status != 'isLogged') {
                WebhookService.notifyApiSessionUpdate(session);
                return { result: "success", message: session.state, qrcode: session.qrcode };
            } else {
                WebhookService.notifyApiSessionUpdate(session);
                return { result: "success", message: session.state };
            }
        }
    } else {
        return { result: "error", message: "NOTFOUND" };
    }
} //getQrcode


static async sendText(sessionName, phone, text) {

    let session = VenomService.getSession(sessionName);

    if (session) {
        WebhookService.notifyApiSessionUpdate(session);
        if (session.state == "STARTING") {
//if(session.state == 'STARTING') {
   //if(session.status == 'isLogged') {
            let resultSendText = await session.client.then(async client => {

                console.log('phone_number entrada:', phone);

                let phone_validation = await VenomService.checkPhone(sessionName, phone);

                if(phone_validation && phone_validation.data.numberExists) {
                    return await client
                    .sendText(phone_validation.data.id._serialized, text)
                    .then((result) => {
                        WebhookService.notifyApiSessionUpdate(session);
                        return result;
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                        return erro;
                    });

                    return send_message;

                } else {

                    console.log('phone sendText else', '55'+phone+'@c.us');

                    let send_message = await client
                    .sendText('55'+phone+'@c.us', text)
                    .then((result) => {
                        WebhookService.notifyApiSessionUpdate(session);
                        console.log('Result: ', result); //return object success
                        return result;
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                        return erro;
                    });

                    return send_message;
                }
            })
            .catch(error => console.log('error', error));
            return { result: "success", data: resultSendText };
        } else {
            return { result: "error", message: session.state };
        }
    } else {
        return { result: "error", message: "NOTFOUND" };
    }
}//message

static async sendTextGroup(sessionName, phone, text) {

    let session = VenomService.getSession(sessionName);

    if (session) {
console.log('sendTextGroup', session);
        WebhookService.notifyApiSessionUpdate(session);
        if (session.state == "STARTING") {
            let resultSendText = await session.client.then(async client => {
                let send_message = await client
                .sendText(phone, text)
                .then((result) => {
                    WebhookService.notifyApiSessionUpdate(session);
                    console.log('Result: ', result); //return object success
                    return result;
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                    return erro;
                });

                return send_message;
            })
            .catch(error => console.log('error', error));
            return { result: "success", data: resultSendText };
        } else {
            return { result: "error", message: session.state };
        }
    } else {
        return { result: "error", message: "NOTFOUND" };
    }
}//message

static async sendFile(sessionName, number, base64Data, fileName, caption) {
    let session = VenomService.getSession(sessionName);
    if (session) {
        WebhookService.notifyApiSessionUpdate(session);
        if (session.state == "CONNECTED") {
            let resultSendFile = await session.client.then(async (client) => {
                let folderName = fs.mkdtempSync(path.join(os.tmpdir(), session.name + '-'));
                let filePath = path.join(folderName, fileName);
                fs.writeFileSync(filePath, base64Data, 'base64');
                console.log(filePath);
                return await client.sendFile(number + '@c.us', filePath, fileName, caption);
            });//client.then(
            return { result: "success" };
        } else {
            return { result: "error", message: session.state };
        }
    } else {
        return { result: "error", message: "NOTFOUND" };
    }
}//message

static async sendLinkPreview(sessionName, link, title) {
    let session = VenomService.getSession(sessionName);
    if (session) {
        WebhookService.notifyApiSessionUpdate(session);
        if (session.state == "CONNECTED") {
            let resultSendLinkPreview = await session.client.then(async client => {
                return await client
                .sendLinkPreview(number + '@c.us', link, title)
                .then((result) => {
                  WebhookService.notifyApiSessionUpdate(session);
                  console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                  console.error('Error when sending: ', erro); //return object error
                });
            })
            .catch(error => console.log('error', error));
            return { result: "success", data: resultSendLinkPreview };
        } else {
            return { result: "error", message: session.state };
        }
    } else {
        return { result: "error", message: "NOTFOUND" };
    }
}

static async getAllChatsGroups(sessionName) {
    let session = VenomService.getSession(sessionName);
    if (session) {
        let groups = await session.client.then(async (client) => {
            return await client.getAllChatsGroups();
        });

        return groups;
    } else {
        return { result: "error", message: "NOTFOUND" };
    }
}

static async checkPhone(sessionName, phone) {
    let session = VenomService.getSession(sessionName);
    if (session) {
  let phone_validator = await session.client.then(async (client) => {

const chat = await client.checkNumberStatus('55'+phone+'@c.us')
.then((result) => {
  console.log('Result: ', result); //return object success
}).catch((erro) => {
  console.error('Error when sending: ', erro); //return object error
});

            let verify = await client.getNumberProfile('55'+phone+'@c.us');
            console.log('verify phone', verify);
            return verify;
        });
        if(phone_validator && phone_validator.id) {
            return { result: "success", data: phone_validator };
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    } else {
        return { result: "error", message: "NOTFOUND" };
    }
}

static async device(sessionName) {
    let session = VenomService.getSession(sessionName);
    if (session) {

        let device = await session.client.then(async (client) => {
            let get_device = await client.getHostDevice();
            console.log('device phone', get_device);
            return get_device;
        });

        return { result: "success", data: device };

    } else {
        return { result: "error", message: "NOTFOUND" };
    }
  }
}
}

export { VenomService };
