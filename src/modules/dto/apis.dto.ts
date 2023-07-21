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

export class AddTokenDTO {
  token: string;
  device_id: string;
  app_id: number;
}

export const AddTokenSchema = Joi.object({
  token: Joi.string().required(),
  device_id: Joi.string().required(),
  app_id: Joi.number().required(),
}).options({
  abortEarly: false,
  allowUnknown: false,
});
