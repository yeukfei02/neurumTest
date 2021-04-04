import express from 'express';
const router = express.Router();

import * as mainController from '../controller/main';

router.get('', mainController.getMain);

export default router;
