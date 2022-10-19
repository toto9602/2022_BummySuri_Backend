import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MintDto } from '../app.dtos';

import { User } from './user.entity';

interface UsersService {
  checkIfSucceeded(userAddr: string): Promise<boolean>;
  markAsSucceeded(userAddr: string): Promise<void>;
  getUserByAddr(userAddr: string): Promise<User>;
  addPoints(userAddr: string, points: number): Promise<void>;
}

@Injectable()
export class UsersServiceImpl implements UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async createUser(req: MintDto): Promise<User> {
    const newUser = this.usersRepository.create({
      userAddr: req.userAddr,
      name: req.name,
      major: req.major,
      phoneNumber: req.phoneNumber,
      univ: req.univ,
    });

    await this.usersRepository.save(newUser);

    return newUser;
  }

  async checkIfSucceeded(userAddr: string): Promise<boolean> {
    try {
      const user = await this.usersRepository.findOneBy({ userAddr });

      const ifSucceeded = user.isSuccess ? true : false;

      return ifSucceeded;
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }

  async markAsSucceeded(userAddr: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOneBy({ userAddr });
      user.isSuccess = true;

      await this.usersRepository.save(user);
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }

  async getUserByAddr(userAddr: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ userAddr });
    if (!user) return null;

    return user;
  }

  async addPoints(userAddr: string, points: number): Promise<void> {
    try {
      const user = await this.getUserByAddr(userAddr);
      user.points = user.points + points;

      await this.usersRepository.save(user);
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }
}
