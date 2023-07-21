import { ApiService } from './apis.service';
import { Controller, Get, Query, Res, UsePipes } from '@nestjs/common';
import {
  AddTokenDTO,
  AddTokenSchema,
  GetCategoriesDTO,
  GetCategoriesSchema,
  GetWallpapersDTO,
  GetWallpapersSchema,
} from './dto/apis.dto';
import { Response } from 'express';
import { success, error } from '../utils/response';
import { JoiValidationPipe } from './../utils/joi.validation.pipe';
import { apis } from 'src/utils/messages';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('get-categories')
  @UsePipes(new JoiValidationPipe(GetCategoriesSchema))
  async getCategories(
    @Query() getCategoriesDTO: GetCategoriesDTO,
    @Res() response: Response,
  ) {
    try {
      const data = await this.apiService.getCategories(getCategoriesDTO);
      success(response, data, apis.categoriesFetchSuccess);
    } catch (e) {
      error(response, null, e.message);
    }
  }

  @Get('get-wallpapers')
  @UsePipes(new JoiValidationPipe(GetWallpapersSchema))
  async getWallpapers(
    @Query() getWallpapersDTO: GetWallpapersDTO,
    @Res() response: Response,
  ) {
    try {
      const data = await this.apiService.getWallpapers(getWallpapersDTO);
      success(response, data, apis.wallpapersFetchSuccess);
    } catch (e) {
      error(response, null, e.message);
    }
  }

  @Get('add-token')
  @UsePipes(new JoiValidationPipe(AddTokenSchema))
  async addToken(@Query() addTokenDTO: AddTokenDTO, @Res() response: Response) {
    try {
      const data = await this.apiService.addToken(addTokenDTO);
      success(response, data, apis.tokenAddedSuccess);
    } catch (e) {
      error(response, null, e.message);
    }
  }
}
