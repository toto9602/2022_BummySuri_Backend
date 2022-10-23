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
import { Betted } from '../user_item/betted.entity';

import { Item } from './item.entity';

interface ItemService {
  saveBettedItemInfo(req: saveBettedItemDto): Promise<Betted>;
  getBettingsCount(): Promise<Bettings>;
}

@Injectable()
export class ItemServiceImpl implements ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private usersService: UsersServiceImpl,
    @InjectRepository(Betted)
    private bettedRepository: Repository<Betted>,
  ) {}

  async saveBettedItemInfo(req: saveBettedItemDto): Promise<Betted> {
    try {
      const user = await this.usersService.getUserByAddr(req.userAddr);

      const bettedItem = await this.itemRepository.findOneBy({
        itemCode: req.itemCode,
      });

      if (bettedItem) {
        const bettingResult = this.bettedRepository.create({
          user: user,
          item: bettedItem,
        });
        user.points = user.points - bettedItem.pointsNeeded;

        const bettedUser = await this.usersService.saveUser(user);

        const result = await this.bettedRepository.save(bettingResult);
        return result;
      }
    } catch (err: any) {
      const msg = err.message || '';
      throw new InternalServerErrorException(msg);
    }
  }

  async getBettingsCount(): Promise<Bettings> {
    const firstItem = await this.getItem('1');
    const firstBetters = await this.bettedRepository.find({
      where: { item: firstItem },
    });

    const secondItem = await this.getItem('2');
    const secondBetters = await this.bettedRepository.find({
      where: { item: secondItem },
    });

    const thirdItem = await this.getItem('3');
    const thirdBetters = await this.bettedRepository.find({
      where: { item: thirdItem },
    });

    const fourthItem = await this.getItem('4');
    const fourthBetters = await this.bettedRepository.find({
      where: { item: fourthItem },
    });

    const fifthItem = await this.getItem('5');
    const fifthBetters = await this.bettedRepository.find({
      where: { item: fifthItem },
    });

    return {
      '1': firstBetters ? firstBetters.length : 0,
      '2': secondBetters ? secondBetters.length : 0,
      '3': thirdBetters ? thirdBetters.length : 0,
      '4': fourthBetters ? fourthBetters.length : 0,
      '5': fifthBetters ? fifthBetters.length : 0,
    };
  }

  private async getItem(itemCode: string): Promise<Item> {
    const item = this.itemRepository.findOneBy({
      itemCode: itemCode,
    });

    return item;
  }
}
