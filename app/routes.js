const Router = require('koa-router');
const passport = require('koa-passport');
// const testCtrl = require('./controllers/test');
const userCtrl = require('./controllers/user');
const authCtrl = require('./controllers/auth');
const productCrtl = require('./controllers/product');
const orderCrtl = require('./controllers/order');
const newsCtrl = require('./controllers/news');
const chatCtrl = require('./controllers/chat');

const db = require('./utils/database');

/* router 1 (/me) */
let me = new Router()
    .get('/', userCtrl.getMe)
    .get('/shopping_cart', orderCrtl.getMyShoppingCart)
    .get('/order', orderCrtl.getMyOrder)
    .get('/chat', chatCtrl.getMyChat)
    .post('/', authCtrl.postSignUp)
    .post('/login', authCtrl.postLogin)
    .post('/logout', authCtrl.postLogout)
    .post('/fb', authCtrl.postFb)
    .post('/shopping_cart', orderCrtl.getMyShoppingCart)
    .put('/', userCtrl.putMe)

/* router 2 (/user) */
let users = new Router()
    .get('/:id', userCtrl.getUserById)
    .get('/:id/farms', userCtrl.getfarmById)
    .get('/:id/farms/reviews', userCtrl.getFarmReview)
    .get('/farms', userCtrl.getFarmList)

let products = new Router()
    .get('/', productCrtl.getProductList)
    .get('/:id', productCrtl.getProductById)
    .get('/:id/rewiews', productCrtl.getProductReview)
    .post('/', productCrtl.postProduct)
    .put('/', productCrtl.putProduct)

let orders = new Router()
    .get('/:id', orderCrtl.getOederById)
    .post('/', orderCrtl.postOrder)
    .put('/', orderCrtl.putOrder)

let news = new Router()
    .get('/', newsCtrl.getNewsList)
    .get('/:id', newsCtrl.getNewsById)
    .post('/', newsCtrl.postNews)
    .put('/', newsCtrl.putNews)

let chats = new Router()
    .get('/:id', chatCtrl.getChatById)
    .post('/', chatCtrl.postChat)

let router = new Router()
router.use('/me', passport.authenticate('jwt', { session: false }), me.routes(), me.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())
router.use('/products', products.routes(), products.allowedMethods())
router.use('/orders', orders.routes(), orders.allowedMethods())
router.use('/news', news.routes(), news.allowedMethods())

    // .get('/test', passport.authenticate('jwt', { session: false }), testCtrl.testing)
    // .post('/login', passport.authenticate('normal-login', {session: false}), authCtrl.postLogin)
    // .get('/buyer/:id', userCtrl.getUser)
    // .get('/seller/:id', userCtrl.getUser)
    // .get('/seller', userCtrl.getSellerList)
    // .get('/product', productCrtl.getProducts)
    // .get('/product/:id', productCrtl.getProductById)
    // .get('/order_form', productCrtl.getOrderForms)
    // .get('/order_form/:id', productCrtl.getOrderFormById)
    // .get('/record', recoedCrtl.getChatLogs)
    // .get('/record/:id', recoedCrtl.getChatLogsById)
    // .get('record/:sender_id', recoedCrtl.getChatLogsBySender)
    // .post('/order_form/', productCrtl.postOrderForms)

module.exports = router