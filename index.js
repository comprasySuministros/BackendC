const express = require('express')
const app = express()
const cors = require('cors')
const {config} = require('./config/index')
const articlesServices = require('./routes/articles')
const {logError,wrapError, handlerError} = require('./util/middleware/errorhandler')
const notfoundhandler = require('./util/middleware/notfoundhandler')

app.use(cors());

app.use(express.json())
articlesServices(app)
app.use(notfoundhandler)

app.use(logError)
app.use(wrapError)
app.use(handlerError)

app.listen(config.port, () =>{
  console.log(`server listening in port http://localhost:${config.port}`);
})