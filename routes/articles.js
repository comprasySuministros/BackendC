const express = require('express')
const articlesServices = require('../services/articles')
const cacheResponse = require('../utils/cacheResponse')
const {FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS} = require('../utils/time')
const validateHandler = require('../utils/middleware/handlerShema')
const { articleIdSchema,
  createArticleSchema,
  updateArticleSchema } = require ('../utils/shema/movies')

function articlesApi(app) {
  const router = express.Router()
  app.use('/api/articles', router)

  const articlesService = new articlesServices()

  router.get('/', async (req, res, next) => {
    cacheResponse(res,FIVE_MINUTES_IN_SECONDS)
    try {
      const articles = await articlesService.getArticles()
      res.status(200).json({
        data: articles,
        message: "success list of articles"
      })  
    } catch (error) {
      next(error);
    }
  })

  router.get('/:articleId', validateHandler({articleId:articleIdSchema}, 'params'),async (req, res, next) => {
    const {articleId} = req.params
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
    try {
      const article = await articlesService.getArticle({articleId})
      res.status(200).json({
        data: article,
        message: "success respond article"
      })  
    } catch (error) {
      next(error);
    }
  })

  router.post('/', validateHandler(createArticleSchema),async (req, res, next) => {
    const {body:articleBody} = req
    try {
      const articleCreate = await articlesService.createArticle({articleBody})
      res.status(201).json({
        data: articleCreate,
        message: "success article created"
      })  
    } catch (error) {
      next(error);
    }
  })

  router.put('/:articleId', validateHandler({articleId:articleIdSchema}, 'params'), validateHandler(updateArticleSchema),async (req, res, next) => {
    const {articleId} = req.params
    const {body:articleBody} = req
    try {
      const articleupdated = await articlesService.updatedArticle({articleId, articleBody})
      res.status(200).json({
        data: articleupdated,
        message: "success article updated"
      })  
    } catch (error) {
      next(error);
    }
  })

  router.delete('/:articleId', validateHandler({articleId:articleIdSchema}, 'params'),async (req, res, next) => {
    const {articleId} = req.params
    try {
      const articledeleted = await articlesService.deletedArticle({articleId})
      res.status(200).json({
        data: articledeleted,
        message: "success article deleted"
      })  
    } catch (error) {
      next(error);
    }
  })

}

module.exports = articlesApi