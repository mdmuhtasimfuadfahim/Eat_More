function cartController(){
 return{
     cart(req, res){
        res.render('customers/cart')
    },
    
    update(req, res){
        /*------------for the first time creating cart and adding basic obeject structure---------------*/
        if(!req.session.cart){
            req.session.cart = {
              menus: {},
              totalQty: 0,
              totalPrice: 0
            }
        }

        
        let cart = req.session.cart

        /*-----------check if menus doesn't exist in cart---------*/ 
        if(!cart.menus[req.body._id]){
            cart.menus[req.body._id]= {
                menus: req.body,
                qty: 1,
                optionOne: 'normal',
                optionTwo: 'normal'
            }
             

            /*---------cart total---------*/ 
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = cart.totalPrice + req.body.price
        } else{
            cart.menus[req.body._id].qty = cart.menus[req.body._id].qty + 1

            /*---------cart total---------*/ 
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = cart.totalPrice + req.body.price
        }
       return res.json({totalQty: req.session.cart.totalQty})
    },

    optionOne(req, res){
        const optionOne = req.body.optionOne
        const id = req.body.cartID

        let cart = req.session.cart

        console.log(req.body)
        

        cart.menus[id].optionOne = optionOne
        return res.redirect('/cart')
    },

    optionTwo(req, res){
        const optionTwo = req.body.optionTwo
        const id = req.body.cartIDTwo

        let cart = req.session.cart

        console.log(req.body)
        

        cart.menus[id].optionTwo = optionTwo
        return res.redirect('/cart')
    }
 }
}


module.exports = cartController