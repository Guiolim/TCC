import express from 'express';
const router = express.Router();

import PersonalTrainerController from '../controllers/personaltrainer.controller.js';

router.post("/personaltrainers", PersonalTrainerController.createPersonalTrainer);
router.patch("/personaltrainers/:id", PersonalTrainerController.updatePersonalTrainer);
router.delete("/personaltrainers/:id", PersonalTrainerController.deletePersonalTrainer);


export default router;
