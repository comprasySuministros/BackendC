const MongoLib = require('../lib/mongo')

class articlesServices{
  constructor(){
    this.collection = 'products'
    this.mongoDB = new MongoLib()
  }

  async getArticles(){
    // const query = tags && {tags:{$in:tags}}
    const articles = await this.mongoDB.getAll(this.collection)
    return articles || []
  }

  async getArticle({articleId}){
    const article = await this.mongoDB.get(this.collection, articleId)
    return article || {}
  }

  async createArticle({articleBody}){
    const createdArticle = await this.mongoDB.create(this.collection, articleBody)
    return createdArticle
  }

  async updatedArticle({articleId, articleBody} = {}){
    const updatedArticle = await this.mongoDB.update(this.collection, articleId, articleBody)
    return updatedArticle
  }

  async deletedArticle({articleId}){
    const deletedArticle = await this.mongoDB.delete(this.collection, articleId)
    return deletedArticle
  }

}

module.exports = articlesServices