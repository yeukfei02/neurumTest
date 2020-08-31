import * as express from 'express';
const router = express.Router();

import * as resourceController from '../controller/resource';

router.put('/resource1', resourceController.updateResource1);
router.put('/resource2', resourceController.updateResource2);
router.put('/update-remote-api', resourceController.updateRemoteApi);

export default router;
