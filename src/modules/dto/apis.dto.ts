import * as Joi from 'joi';

export class GetCategoriesDTO {
  app_id: number;
}

export const GetCategoriesSchema = Joi.object({
  app_id: Joi.number().required(),
}).options({
  abortEarly: false,
  allowUnknown: false,
});

export class GetWallpapersDTO {
  category_id: number;
}

export const GetWallpapersSchema = Joi.object({
  category_id: Joi.number().optional(),
}).options({
  abortEarly: false,
  allowUnknown: false,
});
