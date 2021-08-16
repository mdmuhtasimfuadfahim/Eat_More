/*------------controllers-----------*/ 
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')


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
     
    
    
}


module.exports = initRoutes