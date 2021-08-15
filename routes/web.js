const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')


function initRoutes(app){
    /*------------home page controller----------*/ 
    app.get('/', homeController().index)
    
    /*-----------customers cart controller route-------------*/ 
    app.get('/cart', cartController().cart)
    app.post('/upate-cart', cartController().update)

    /*-----------auth controller routes--------*/
    app.get('/registration', authController().registration),
    app.get('/login', authController().login)

     
    
    
}


module.exports = initRoutes