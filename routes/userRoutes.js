import express from 'express';
import { createUser, getUserWithCart, updateUser, deleteUser } from './../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUserWithCart);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;