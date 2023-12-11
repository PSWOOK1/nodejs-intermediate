export class ProductsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllProducts = async () => {
    // ORM인 Prisma에서 products 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const products = await prisma.products.findMany();

    return products;
  };

  findproductById = async (productId) => {
    // ORM인 Prisma에서 Products 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const product = await prisma.products.findUnique({
      where: { productId: +productId },
    });

    return product;
  };

  createProduct = async (nickname, password, title, content) => {
    // ORM인 Prisma에서 Products 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdProduct = await prisma.products.create({
      data: {
        nickname,
        password,
        title,
        content,
      },
    });

    return createdProduct;
  };

  updateProduct = async (productId, password, title, content) => {
    // ORM인 Prisma에서 Products 모델의 update 메서드를 사용해 데이터를 수정합니다.
    const updatedProduct = await prisma.products.update({
      where: {
        productId: +productId,
        password: password,
      },
      data: {
        title,
        content,
      },
    });

    return updatedProduct;
  };

  deleteProduct = async (productId, password) => {
    // ORM인 Prisma에서 Products 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
    const deletedProduct = await prisma.products.delete({
      where: {
        productId: +productId,
        password: password,
      },
    });

    return deletedProduct;
  };
}
