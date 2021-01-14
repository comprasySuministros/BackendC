const joi = require('joi') 

const articleIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const articleIdpsSchema = joi.number().integer().min(1).max(10000000000000);
const articleNameSchema = joi.string();
const articlePresentationSchema = joi.string();
const articlePriceSchema = joi.number().integer().min(1).max(10000000);
const articleconceptSchema = joi.string();

const createArticleSchema = {
  IdPS: articleIdpsSchema.required(),
  name: articleNameSchema.required(),
  presentation: articlePresentationSchema.required(),
  Price: articlePriceSchema.required(),
  concept: articleconceptSchema.required()
};

const updateArticleSchema = {
  IdPS: articleIdpsSchema,
  name: articleNameSchema,
  presentation: articlePresentationSchema,
  Price: articlePriceSchema,
  concept: articleconceptSchema
};

module.exports = {
  articleIdSchema,
  createArticleSchema,
  updateArticleSchema
};