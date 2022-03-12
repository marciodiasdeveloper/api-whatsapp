import { Request, Response, Router } from "express";

import { StartController } from "@modules/whatsapp/useCases/start/startController";

const router = Router();

const startController = new StartController();

router.get("/start", startController.handle);
// router.get('/', QrCodeController.handle);
// router.get('/', StatusController.handle);
// router.get('/', DeviceController.handle);
// router.get('/', SendTextController.handle);
// router.get('/', SendFileController.handle);
// router.get('/', CloseController.handle);
// router.get('/', GroupsController.handle);
// router.get('/', CheckPhoneController.handle);
// router.get('/', BatteryController.handle);
// router.get('/', QrCodeController.handle);
// router.get('/', StatusController.handle);
// router.get('/', DeviceController.handle);
// router.get('/', SendTextController.handle);
// router.get('/', SendFileController.handle);
// router.get('/', CloseController.handle);
// router.get('/', GroupsController.handle);
// router.get('/', CheckPhoneController.handle);
// router.get('/', BatteryController.handle);

router.get("/", (request: Request, response: Response) => {
  return response.json({ success: true, api: "api-discord" });
});

export { router };
