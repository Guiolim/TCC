import express from 'express';
const router = express.Router();

import UserController from '../controllers/user.controller.js';

router.post("/users", UserController.createUser);
router.patch("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
