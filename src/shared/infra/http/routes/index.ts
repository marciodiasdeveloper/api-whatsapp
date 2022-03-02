import { Request, Response, Router } from "express";

import { StartController } from "@modules/WhatsApp/useCases/start/startController";

const router = Router();

const startController = new StartController();

router.get("/start", StartController.handle);
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
