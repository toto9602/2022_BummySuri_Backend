import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bettings, saveBettedItemDto } from '../app.dtos';
import { UsersServiceImpl } from '../users/users.service';
import { Betted } from '../user_item/betted.entity';

import { Item } from './item.entity';

interface ItemService {
  saveBettedItemInfo(req: saveBettedItemDto): Promise<Betted>;
  getBettingsCount(): Promise<Bettings>;
}

@Injectable()
export class ItemServiceImpl implements ItemService {
  private readonly logger = new Logger();
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

        if (user.points < bettedItem.pointsNeeded) {
          this.logger.warn('Betting Failed because of insufficient Points');

          throw new BadRequestException('Not Enough Points');
        }
        user.points = user.points - bettedItem.pointsNeeded;

        const bettedUser = await this.usersService.saveUser(user);

        const result = await this.bettedRepository.save(bettingResult);
        return result;
      }
    } catch (err: any) {
      const msg = err.message || '';
      if (err instanceof HttpException) throw err;

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
