import express from 'express';
const router = express.Router();

import AlimentoController from '../controllers/alimentos.controller.js';

router.post("/alimentos", AlimentoController.createAlimento);
router.patch("/alimentos/:id", AlimentoController.updateAlimento);
router.delete("/alimentos/:id", AlimentoController.deleteAlimento);



export default router;
