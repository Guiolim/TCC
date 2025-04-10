import express from 'express';
const router = express.Router();

import ProgressaoCargaController from '../controllers/progressaocarga.controller.js';

router.post("/progressaocarga", ProgressaoCargaController.createProgressao);
router.patch("/progressaocarga/:id", ProgressaoCargaController.updateProgressao);
router.delete("/progressaocarga/:id", ProgressaoCargaController.deleteProgressao);




export default router;
