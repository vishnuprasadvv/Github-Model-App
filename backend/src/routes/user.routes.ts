import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const userController = new UserController();

router.get('/:username', userController.fetchUser);
router.put('/:username', userController.updateUser);
router.delete('/:username', userController.deleteUser);
router.get('/', userController.getUsersSorted);


export default router;