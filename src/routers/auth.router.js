import { Router } from 'express';
import { AuthsController } from '../controllers/auth.controller.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.cjs';
import {
  PASSWORD_HASH_SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.costant.js';
const { Users } = db;

const authsController = new AuthsController();

const authRouter = Router();

// 회원가입
authRouter.post('/signup', authsController.signUp);

// 로그인
authRouter.post('/signin', authsController.signIn);

export { authRouter };
