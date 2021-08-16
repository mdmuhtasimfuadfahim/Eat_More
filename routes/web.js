/*------------controllers-----------*/ 
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')


/*------------middlewares----------*/
const guest = require('../app/http/middlewares/guest') 

function initRoutes(app){
    /*------------home page controller----------*/ 
    app.get('/', homeController().index)
    
    /*-----------customers cart controller route-------------*/ 
    app.get('/cart', cartController().cart)
    app.post('/upate-cart', cartController().update)

    /*-----------auth controller routes--------*/
    app.get('/registration', guest, authController().registration),
    app.get('/login', guest, authController().login)
    app.post('/registration', authController().postRegistration)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)
     
    /*-----------orders controller routes--------*/ 
    app.post('/orders', orderController().store)
    app.get('/customer/orders', orderController().index)

}


module.exports = initRoutes