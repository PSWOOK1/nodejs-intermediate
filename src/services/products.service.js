export class ProductsRepository {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  findAllProducts = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const products = await this.productsRepository.findAllProducts();

    // 호출한 product들을 가장 최신 게시글 부터 정렬합니다.
    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return products.map((product) => {
      return {
        productId: product.productId,
        nickname: product.nickname,
        title: product.title,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  };

  findProductById = async (productId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const product = await this.productsRepository.findProductById(productId);

    return {
      productId: product.productId,
      nickname: product.nickname,
      title: product.title,
      content: product.content,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };

  createProduct = async (nickname, password, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createdProduct = await this.productsRepository.createProduct(
      nickname,
      password,
      title,
      content,
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      productId: createdProduct.productId,
      nickname: createdProduct.nickname,
      title: createdProduct.title,
      content: createdProduct.content,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    };
  };

  updateProduct = async (productId, password, title, content) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const product = await this.productsRepository.findProductById(productId);
    if (!product) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.productsRepository.updateproduct(
      productId,
      password,
      title,
      content,
    );

    // 변경된 데이터를 조회합니다.
    const updatedProduct = await this.productsRepository.findProductById(
      productId,
    );

    return {
      productId: updatedProduct.productId,
      nickname: updatedProduct.nickname,
      title: updatedProduct.title,
      content: updatedProduct.content,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    };
  };

  deleteProduct = async (productId, password) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const product = await this.productsRepository.findProductById(productId);
    if (!product) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.productsRepository.deleteProduct(productId, password);

    return {
      productId: product.productId,
      nickname: product.nickname,
      title: product.title,
      content: product.content,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };
}
