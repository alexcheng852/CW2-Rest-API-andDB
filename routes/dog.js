const Router = require('koa-router');
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser');
const prefix = '/api/v1/dogs';
const dogsModel = require('../models/dogs.js');
const router = Router({prefix: prefix});
const request = require('request')



router.get('/', getDogs);
router.post('/', auth, koaBody, valDog, createDog, tweetDog, imageUpload);
router.get('/:ID([0-9]{1,})', getById);
router.get('/count', countDogs);
router.get('/breeds', getAllBreeds);
router.put('/:ID([0-9]{1,})', auth, koaBody, valDogUpdate, updateDog, imageUpload);
router.del('/:ID([0-9]{1,})', auth, deleteDog);

module.exports = router;