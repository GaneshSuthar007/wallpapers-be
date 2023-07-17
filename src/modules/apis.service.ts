import { GetCategoriesDTO, GetWallpapersDTO } from './dto/apis.dto';
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { apis } from 'src/utils/messages';
import { Categories } from 'src/entities/categories.entity';
import { Wallpapers } from 'src/entities/wallpapers.entity';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepo: Repository<Categories>,
    @InjectRepository(Wallpapers)
    private wallpapersRepo: Repository<Wallpapers>,
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
      const data = await this.wallpapersRepo.find({
        where: {
          category: {
            id: category_id,
          },
        },
        select: {
          id: true,
          url: true,
        },
        order: {
          createdAt: 'desc',
        },
      });

      return data;
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(apis.failedToFetchWallpapers);
    }
  }
}
