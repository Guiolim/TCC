import express from 'express';
const router = express.Router();

import AvaliacaoController from '../controllers/avaliacao.controller.js';

router.post("/avaliacoes", AvaliacaoController.createAvaliacao);
router.patch("/avaliacoes/:id", AvaliacaoController.updateAvaliacao);
router.delete("/avaliacoes/:id", AvaliacaoController.deleteAvaliacao);



export default router;
