import express from 'express';
const router = express.Router();

import AlimentoConsumidoController from '../controllers/alimentosconsumidos.controller.js';

router.post("/alimentosconsumidos", AlimentoConsumidoController.createAlimentoConsumido);
router.patch("/alimentosconsumidos/:id", AlimentoConsumidoController.updateAlimentoConsumido);
router.delete("/alimentosconsumidos/:id", AlimentoConsumidoController.deleteAlimentoConsumido);



export default router;
