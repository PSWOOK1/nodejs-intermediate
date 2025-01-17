import { Sequelize } from 'sequelize';
import db from '../../models/index.cjs';
const { Products, Users } = db;
export class ProductsRepository {
  createProduct = async (title, description, userId) => {
    // ORM인 Prisma에서 Products 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const product = await Products.create({ title, description, userId });

    return product?.toJSON();
  };
  getProducts = async (sort) => {
    // ORM인 Prisma에서 products 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const products = await Products.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'status',
        'userId',
        [Sequelize.col('user.name'), 'userName'],
        'createdAt',
        'updatedAt',
      ],
      order: [['createdAt', sort]],
      include: { model: Users, as: 'user', attributes: [] },
    });

    return products?.map((product) => product.toJson());
  };

  findproductById = async (id) => {
    const product = await Products.findByPk(id, {
      attributes: [
        'id',
        'title',
        'description',
        'status',
        'userId',
        [Sequelize.col('user.name'), 'userName'],
        'createdAt',
        'updatedAt',
      ],
      include: { model: Users, as: 'user', attributes: [] },
    });

    return product?.toJSON();
  };

  //   updateProduct = async (productId, password, title, content) => {
  //     // ORM인 Prisma에서 Products 모델의 update 메서드를 사용해 데이터를 수정합니다.
  //     const updatedProduct = await prisma.products.update({
  //       where: {
  //         productId: +productId,
  //         password: password,
  //       },
  //       data: {
  //         title,
  //         content,
  //       },
  //     });

  //     return updatedProduct;
  //   };

  //   deleteProduct = async (productId, password) => {
  //     // ORM인 Prisma에서 Products 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
  //     const deletedProduct = await prisma.products.delete({
  //       where: {
  //         productId: +productId,
  //         password: password,
  //       },
  //     });

  //     return deletedProduct;
  //   };
}
