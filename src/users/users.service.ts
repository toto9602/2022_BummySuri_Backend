import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async checkifSucceeded(userAddr: string): Promise<boolean> {
    try {
      const user = await this.usersRepository.findOneBy({ userAddr });

      const ifSucceeded = user.isSuccess ? true : false;

      return ifSucceeded;
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }

  async checkSuccess(userAddr: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOneBy({ userAddr });
      user.isSuccess = true;

      await this.usersRepository.save(user);
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }
}
