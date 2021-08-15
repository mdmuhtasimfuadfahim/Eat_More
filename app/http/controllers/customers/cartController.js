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
                qty: 1
            }
             

            cart.totalQty = cart.totalQty + 1
            console.log(req.body.price)
            cart.totalPrice = cart.totalPrice + req.body.price
            console.log(cart.totalQty + '\n' + cart.totalPrice)
        } else{
            cart.menus[req.body._id].qty = cart.menus[req.body._id].qty + 1
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = cart.totalPrice + req.body.price
            console.log(cart.totalQty + '\n' + cart.totalPrice)
        }
       return res.json({totalQty: req.session.cart.totalQty})
    }
 }
}


module.exports = cartController