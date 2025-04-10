import express from 'express';
const router = express.Router();

import PersonalTrainersController from '../controllers/personaltrainers.controller.js';

router.post("/personaltrainers", PersonalTrainersController.createTrainer);
router.patch("/personaltrainers/:id", PersonalTrainersController.updateTrainer);
router.delete("/personaltrainers/:id", PersonalTrainersController.deleteTrainer);


export default router;
