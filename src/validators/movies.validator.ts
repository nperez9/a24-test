import Joi from '@hapi/joi';

const moviesImagesValidatorSchema = Joi.object({
  cover: Joi.string().required(),
  poster: Joi.string().optional(),
  captures: Joi.array().items(Joi.string()).optional(),
});

export const moviesValidatorSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  shortDescription: Joi.string().required(),
  duration: Joi.number().required(),
  releaseDate: Joi.string().required(),
  genres: Joi.array().items(Joi.string()).required(),
  images: moviesImagesValidatorSchema,
  actors: Joi.array().items(Joi.string()).optional(),
  platformProduct: Joi.bool().optional(),
});
