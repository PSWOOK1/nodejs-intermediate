import { ProductsRepository } from '../repositories/products.repository';
import { Sequelize } from 'sequelize';
import db from '../../models/index.cjs';
import * as HttpStatus from '../errors/http-status.error';

const { Products, Users } = db;

export class ProductsService {
  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  // 게시글 생성
  createProduct = async ({ title, description, userId, userName }) => {
    const product = await this.productsRepository.createProduct({
      title,
      description,
      userId,
    });

    return { ...product, userName };
  };
  // 조회
  getProducts = async ({ sort }) => {
    const products = await this.productsRepository.getProducts({ sort });

    return products;
  };
  // 상세 조회
  findProductById = async ({ id }) => {
    const product = await this.productsRepository.findproductById(id);

    if (!product) {
      throw new HttpStatus.NotFound('상품 조회에 실패했습니다.');
    }

    return product;
  };

  //   updateProduct = async (productId, password, title, content) => {
  //     // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
  //     const product = await this.productsRepository.findProductById(productId);
  //     if (!product) throw new Error('존재하지 않는 게시글입니다.');

  //     // 저장소(Repository)에게 데이터 수정을 요청합니다.
  //     await this.productsRepository.updateproduct(
  //       productId,
  //       password,
  //       title,
  //       content,
  //     );

  //     // 변경된 데이터를 조회합니다.
  //     const updatedProduct = await this.productsRepository.findProductById(
  //       productId,
  //     );

  //     return {
  //       productId: updatedProduct.productId,
  //       nickname: updatedProduct.nickname,
  //       title: updatedProduct.title,
  //       content: updatedProduct.content,
  //       createdAt: updatedProduct.createdAt,
  //       updatedAt: updatedProduct.updatedAt,
  //     };
  //   };

  //   deleteProduct = async (productId, password) => {
  //     // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
  //     const product = await this.productsRepository.findProductById(productId);
  //     if (!product) throw new Error('존재하지 않는 게시글입니다.');

  //     // 저장소(Repository)에게 데이터 삭제를 요청합니다.
  //     await this.productsRepository.deleteProduct(productId, password);

  //     return {
  //       productId: product.productId,
  //       nickname: product.nickname,
  //       title: product.title,
  //       content: product.content,
  //       createdAt: product.createdAt,
  //       updatedAt: product.updatedAt,
  //     };
  //   };
}
