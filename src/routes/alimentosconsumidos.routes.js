import express from 'express';
const router = express.Router();

import AlimentosConsumidosController from '../controllers/alimentosconsumidos.controller.js';

router.post("/alimentosconsumidos", AlimentosConsumidosController.createAlimentoConsumido);
router.patch("/alimentosconsumidos/:id", AlimentosConsumidosController.updateAlimentosConsumidos);
router.delete("/alimentosconsumidos/:id", AlimentosConsumidosController.deleteAlimentosConsumidos);

export default router;
