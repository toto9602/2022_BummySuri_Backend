import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRes, Bettings, MintDto, saveBettedItemDto } from '../app.dtos';
import { User } from '../users/user.entity';
import { UsersServiceImpl } from '../users/users.service';

import { Item } from './item.entity';

interface ItemService {
  saveBettedItemInfo(req: saveBettedItemDto): Promise<User>;
  getBettingsCount(): Promise<Bettings>;
}

@Injectable()
export class ItemServiceImpl implements ItemService {
  constructor(
    @InjectRepository(Item)
    private usersRepository: Repository<User>,
    private itemRepository: Repository<Item>,
    private usersService: UsersServiceImpl,
  ) {}

  async saveBettedItemInfo(req: saveBettedItemDto): Promise<User> {
    try {
      const user = await this.usersService.getUserByAddr(req.userAddr);

      const bettedItem = await this.itemRepository.findOneBy({
        itemCode: req.itemCode,
      });

      if (bettedItem) {
        user.bettedItem = bettedItem;

        const bettedUser = await this.usersRepository.save(user);

        return bettedUser;
      }
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }

  async getBettingsCount(): Promise<Bettings> {
    const firstBettings = await this.itemRepository.findOneBy({
      itemCode: '1',
    });

    const secondBettings = await this.itemRepository.findOneBy({
      itemCode: '2',
    });

    const thirdBettings = await this.itemRepository.findOneBy({
      itemCode: '3',
    });

    const fourthBettings = await this.itemRepository.findOneBy({
      itemCode: '4',
    });

    const fifthBettings = await this.itemRepository.findOneBy({
      itemCode: '5',
    });

    return {
      '1': firstBettings.bettedUsers.length,
      '2': secondBettings.bettedUsers.length,
      '3': thirdBettings.bettedUsers.length,
      '4': fourthBettings.bettedUsers.length,
      '5': fifthBettings.bettedUsers.length,
    };
  }
}
