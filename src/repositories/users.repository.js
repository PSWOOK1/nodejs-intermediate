import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllUsers = async () => {
    // ORM인 Prisma에서 users 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const users = await prisma.users.findMany();

    return users;
  };

  finduserById = async (userId) => {
    // ORM인 Prisma에서 Users 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const user = await prisma.users.findUnique({
      where: { userId: +userId },
    });

    return user;
  };

  createUser = async (nickname, password, title, content) => {
    // ORM인 Prisma에서 Users 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdUser = await prisma.users.create({
      data: {
        nickname,
        password,
        title,
        content,
      },
    });

    return createdUser;
  };

  updateUser = async (userId, password, title, content) => {
    // ORM인 Prisma에서 Users 모델의 update 메서드를 사용해 데이터를 수정합니다.
    const updatedUser = await prisma.users.update({
      where: {
        userId: +userId,
        password: password,
      },
      data: {
        title,
        content,
      },
    });

    return updatedUser;
  };

  deleteUser = async (userId, password) => {
    // ORM인 Prisma에서 Users 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
    const deletedUser = await prisma.users.delete({
      where: {
        userId: +userId,
        password: password,
      },
    });

    return deletedUser;
  };
}
