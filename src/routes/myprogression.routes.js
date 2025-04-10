import express from 'express';
const router = express.Router();

import MyProgressionController from '../controllers/myprogression.controller.js';

router.post("/myprogression", MyProgressionController.createProgression);
router.patch("/myprogression/:id", MyProgressionController.updateProgression);
router.delete("/myprogression/:id", MyProgressionController.deleteProgression);



export default router;
