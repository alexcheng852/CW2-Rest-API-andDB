const {validateArticle} = require('../controllers/validation');
const auth = require('../controllers/auth');
const can = require('../permissions/users');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/users')

const router = Router({prefix: '/api/v1/users'})

router.get('/', auth, getAll)
router.post('/', bodyParser(), createUser)
router.get('/:id([0-9]{1,})', getById)
router.put('/:id([0-9]{1,})',updateUser)
router.del('/:id([0-9]{1,})', deleteUser)
router.get('/m', getAllM)
router.get('/m/:id([0-9]{1,})', getByIdM)
router.post('/m', bodyParser(),  createUserM)

async function getAll(ctx, next){  
 const permission = can.readAll(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
 let users = await model.getAll()
  if (users.length) {
    ctx.body = users
  }
} 
}

async function getById(ctx) {
  let id = ctx.params.id
  let user = await model.getById(id)
  if (user.length) {
    ctx.body = user[0]
  }
}

async function createUser(ctx) {
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

async function updateUser(ctx) {
  // TODO edit an existing article
}

async function deleteUser(ctx) {
  // TODO delete an existing article
}

async function getAllM(ctx, next){  
  let users = await model.getAllMongo()
  if (users) {
    ctx.body = users
  }
}  

async function getByIdM(ctx) {
  let id = ctx.params.id
  console.log(id)
  let user = await model.getByIdMongo(id)
  if (user.length) {
    ctx.body = article[0]
  }
}

async function createUserM(ctx) {
  const body = ctx.request.body
  let result = await model.addMongo(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  }
}

module.exports = router;
