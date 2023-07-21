import {
  AddTokenDTO,
  GetCategoriesDTO,
  GetWallpapersDTO,
} from './dto/apis.dto';
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { apis } from 'src/utils/messages';
import { Categories } from 'src/entities/categories.entity';
import { Wallpapers } from 'src/entities/wallpapers.entity';
import { Tokens } from 'src/entities/tokens.entity';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepo: Repository<Categories>,
    @InjectRepository(Wallpapers)
    private wallpapersRepo: Repository<Wallpapers>,
    @InjectRepository(Tokens)
    private tokensRepo: Repository<Tokens>,
  ) {}

  async getCategories(getBrandsDTO: GetCategoriesDTO) {
    try {
      const { app_id } = getBrandsDTO;

      const data = await this.categoriesRepo.find({
        where: {
          app: {
            id: app_id,
          },
        },
        relations: ['app'],
        select: {
          id: true,
          name: true,
          url: true,
          app: {
            id: true,
            name: true,
          },
        },
        order: {
          name: 'ASC',
        },
      });

      return data;
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(apis.failedToFetchCategories);
    }
  }

  async getWallpapers(getWallpapersDTO: GetWallpapersDTO) {
    try {
      const { category_id } = getWallpapersDTO;
      const data = this.wallpapersRepo
        .createQueryBuilder('wallpaper')
        .where(category_id ? { category: { id: category_id } } : {})
        .select(['wallpaper.id', 'wallpaper.url', 'wallpaper.is_premium'])
        .orderBy('RAND()')
        .take(category_id ? undefined : 40)
        .getMany();
      return data;
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(apis.failedToFetchWallpapers);
    }
  }

  async addToken(addTokenDTO: AddTokenDTO) {
    try {
      const { device_id, token, app_id } = addTokenDTO;

      const findDevice = await this.tokensRepo.findOne({
        where: {
          device_id,
          app: {
            id: app_id,
          },
        },
      });
      let data;
      if (!findDevice) {
        data = await this.tokensRepo.save({
          device_id,
          token,
          app: {
            id: app_id,
          },
        });
      } else {
        data = await this.tokensRepo.save({
          id: findDevice.id,
          device_id,
          token,
          app: {
            id: app_id,
          },
        });
      }
      return data;
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(apis.failedToFetchWallpapers);
    }
  }
}
