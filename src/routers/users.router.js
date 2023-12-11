import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { Sequelize } from 'sequelize';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import db from '../models/index.cjs';

const usersController = new UsersController();

const usersRouter = Router();
const { Products, Users } = db;

// 내 정보 조회
usersRouter.get('/me', needSignin, usersController.myInfo);

export { usersRouter };
