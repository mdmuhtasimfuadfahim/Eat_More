/*------------controllers-----------*/ 
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/adminOrderController')
const statusController = require('../app/http/controllers/admin/statusController')


/*------------middlewares----------*/
const guest = require('../app/http/middlewares/guest') 
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')


function initRoutes(app){
    /*------------home page controller----------*/ 
    app.get('/', homeController().index)
    
    /*-----------customers cart controller route-------------*/ 
    app.get('/cart', auth, cartController().cart)
    app.post('/upate-cart', auth, cartController().update)
    app.post('/cart/option/one', cartController().optionOne)
    app.post('/cart/option/two', cartController().optionTwo)

    /*-----------auth controller routes--------*/
    app.get('/registration', guest, authController().registration),
    app.get('/login', guest, authController().login)
    app.post('/registration', authController().postRegistration)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)
     
    /*-----------orders controller routes--------*/ 
    app.post('/orders', orderController().store)
    app.get('/customer/orders', auth, orderController().index)

    /*-----------admin routes------------*/
    app.get('/admin/orders', admin, adminOrderController().index) 
    app.post('/admin/order/status', admin, statusController().updateStatus)
    app.get('/users', admin, homeController().customers)
}


module.exports = initRoutes