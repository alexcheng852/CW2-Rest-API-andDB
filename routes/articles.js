const {validateArticle} = require('../controllers/validation');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/articles')

const router = Router({prefix: '/api/v1/articles'})

router.get('/', getAll)
router.post('/', bodyParser(),validateArticle, createArticle)
router.get('/:id([0-9]{1,})', getById)
router.put('/:id([0-9]{1,})',bodyParser(), validateArticle,updateArticle)
router.del('/:id([0-9]{1,})', deleteArticle)
router.get('/m', getAllM)
router.get('/m/:id([0-9]{1,})', getByIdM)
router.put('/m/:id([0-9]{1,})',bodyParser(), updateArticleM)
router.del('/m/:id([0-9]{1,})',deleteArticleM)
router.post('/m', bodyParser(),  createArticleM)

async function getAll(ctx, next){  
  let articles = await model.getAll()
  if (articles.length) {
    ctx.body = articles
  }
}  

async function getById(ctx) {
  let id = ctx.params.id
  let article = await model.getById(id)
  if (article.length) {
    ctx.body = article[0]
  }
}

async function createArticle(ctx) {
  const body = ctx.request.body
  let result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  } else {
    ctx.status=201
    ctx.body = "{}"
  }
}

async function updateArticle(ctx) {
  // TODO edit an existing article
   const body = ctx.request.body
   let id = ctx.params.id
 // console.log("route-article " , body)
 // console.log("route-id ",id)
  let result = await model.update(body,id)
  if (result) {
    ctx.status = 201
    ctx.body = `Article with id ${id} updated` 
  } 
}

async function deleteArticle(ctx) {
  // TODO delete an existing article
   let id = ctx.params.id
  let article = await model.deleteById(id)
  ctx.status=201
    ctx.body = `Article with id ${id} deleted`
}

async function getAllM(ctx, next){  
  let articles = await model.getAllMongo()
  if (articles) {
    ctx.body = articles
  }
}  

async function getByIdM(ctx) {
  let id = ctx.params.id
  console.log(id)
  let article = await model.getByIdMongo(id)
  if (article) {
    ctx.body = article[0]
  }
}

async function createArticleM(ctx) {
  const body = ctx.request.body
  let result = await model.addMongo(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  }
}

async function deleteArticleM(ctx) {
  let id = ctx.params.id
 // console.log(id)
  let article = await model.delMongo(id)
  if (article) {
    ctx.body = `The first Article with authorID ${id} deleted`
  }
}

async function updateArticleM(ctx) {
   let id = ctx.params.id
   let updateArticle = ctx.request.body
  
 // console.log(id)
  let article = await model.updateMongo(id, updateArticle)
  if (article) {
    ctx.body = `The first Article with authorID ${id} updated`
  }
}

module.exports = router;
