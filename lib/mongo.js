const {MongoClient, ObjectId} = require('mongodb')
const {config} = require('../config/index')

const USER = encodeURIComponent(config.db_user)
const PASSWORD = encodeURIComponent(config.db_password)
const DBNAME = config.db_name

const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@${config.db_host}/${DBNAME}?retryWrites=true&w=majority`

class MongoLib{
  constructor(){
    this.client = new MongoClient(MONGO_URL,{
      useNewUrlParser:true,
      useUnifiedTopology: true
    })
    this.dbName = DBNAME
  }

  connect(){
    if (!MongoLib.connection){
      MongoLib.connection = new Promise((resolve, reject) =>{
        this.client.connect(err=>{
          if (err){
            reject(err)
          }
          console.log('connection success to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }

    return MongoLib.connection
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .findOne({ _id: ObjectId(id) })
    });
  }

  create(collection, data) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .insertOne(data)
    }).then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
    .then(db => {
      return db
        .collection(collection)
        .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
    }).then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
    .then(db => {
      return db
        .collection(collection)
        .deleteOne({ _id: ObjectId(id) })
    }).then(() => id);
  }

}

module.exports = MongoLib