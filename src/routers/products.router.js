import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { Sequelize } from 'sequelize';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import db from '../models/index.cjs';

const productsController = new ProductsController();

const productsRouter = Router();
const { Products, Users } = db;

// 생성
productsRouter.post('/products', needSignin, productsController.createProducts);

// 목록 조회
productsRouter.get('/products', productsController.getProducts);

// 상세 조회
productsRouter.get('/:productId', productsController.getProductsById);

// 수정
productsRouter.put(
  '/:productId',
  needSignin,
  productsController.updateProducts,
);

// 삭제
productsRouter.delete(
  '/:productId',
  needSignin,
  productsController.deleteProducts,
);

export { productsRouter };
