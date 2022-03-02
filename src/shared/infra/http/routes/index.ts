import { Request, Response, Router } from "express";

// import { ChannelsController } from "@modules/Discord/useCases/channels/channelsController";
// import { InviteController } from "@modules/Discord/useCases/invite/inviteController";
// import { LoginOAuthCallbackController } from "@modules/Discord/useCases/loginOAuthCallback/loginOAuthCallbackController";
// import { LogOutController } from "@modules/Discord/useCases/logOut/logOutController";

const router = Router();

// const loginOAuthCallbackController = new LoginOAuthCallbackController();
// const inviteController = new InviteController();
// const channelsController = new ChannelsController();
// const logOutController = new LogOutController();

// router.get('/start', StartController.handle);
// router.get('/qrcode', QrCodeController.handle);
// router.get('/status', StatusController.handle);
// router.get('/device', DeviceController.handle);
// router.get('/sendText', SendTextController.handle);
// router.get('/sendFile', SendFileController.handle);
// router.get('/close', CloseController.handle);
// router.get('/groups', GroupsController.handle);
// router.get('/checkPhone', CheckPhoneController.handle);

router.get("/", (request: Request, response: Response) => {
  return response.json({ success: true, api: "api-discord" });
});

export { router };
