import express from 'express';
const router = express.Router();

import TreinoController from '../controllers/treino.controller.js';

router.post("/treinos", TreinoController.createTreino);
router.patch("/treinos/:id", TreinoController.updateTreino);
router.delete("/treinos/:id", TreinoController.deleteTreino);



export default router;
