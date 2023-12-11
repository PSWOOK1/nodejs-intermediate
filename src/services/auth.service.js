// import { AuthsRepository } from '../repositories/auths.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class AuthsService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  findAllAuths = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const auths = await this.authsRepository.findAllAuths();

    // 호출한 auth들을 가장 최신 게시글 부터 정렬합니다.
    auths.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return auths.map((auth) => {
      return {
        authId: auth.authId,
        nickname: auth.nickname,
        title: auth.title,
        createdAt: auth.createdAt,
        updatedAt: auth.updatedAt,
      };
    });
  };

  findAuthById = async (authId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const auth = await this.authsRepository.findAuthById(authId);

    return {
      authId: auth.authId,
      nickname: auth.nickname,
      title: auth.title,
      content: auth.content,
      createdAt: auth.createdAt,
      updatedAt: auth.updatedAt,
    };
  };

  createAuth = async (nickname, password, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createdAuth = await this.authsRepository.createAuth(
      nickname,
      password,
      title,
      content,
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      authId: createdAuth.authId,
      nickname: createdAuth.nickname,
      title: createdAuth.title,
      content: createdAuth.content,
      createdAt: createdAuth.createdAt,
      updatedAt: createdAuth.updatedAt,
    };
  };

  updateAuth = async (authId, password, title, content) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const auth = await this.authsRepository.findAuthById(authId);
    if (!auth) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.authsRepository.updateauth(authId, password, title, content);

    // 변경된 데이터를 조회합니다.
    const updatedAuth = await this.authsRepository.findAuthById(authId);

    return {
      authId: updatedAuth.authId,
      nickname: updatedAuth.nickname,
      title: updatedAuth.title,
      content: updatedAuth.content,
      createdAt: updatedAuth.createdAt,
      updatedAt: updatedAuth.updatedAt,
    };
  };

  deleteAuth = async (authId, password) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const auth = await this.authsRepository.findAuthById(authId);
    if (!auth) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.authsRepository.deleteAuth(authId, password);

    return {
      authId: auth.authId,
      nickname: auth.nickname,
      title: auth.title,
      content: auth.content,
      createdAt: auth.createdAt,
      updatedAt: auth.updatedAt,
    };
  };
}
