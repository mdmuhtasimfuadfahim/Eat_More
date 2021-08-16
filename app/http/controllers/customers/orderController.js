const Order = require('../../../models/order')
const moment = require('moment')

function orderController(){
    return{
        store(req, res){
            /*-----------validate request---------*/
            const{ phone, address } = req.body
            if(!phone || !address){
                req.flash('error', 'All Fields are Required')
                return res.redirect('/cart')
            }

            /*-----------store orders into database---------*/ 
            const order  = new Order({
                customerId: req.user._id,
                menus: req.session.cart.menus,
                phone,
                address
            })

            console.log(order)

            order.save().then(result =>{
                req.flash('success', 'Order Placed Successfully')
                delete req.session.cart
                return res.redirect('/customer/orders')
            }).catch(err =>{
                req.flash('error', 'Something went Wrong')
                return res.redirect('/cart')
            })
        },

        async index(req, res){
            const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 }})
            console.log(orders)

            res.header('Cache-Control', 'no-store')
            res.render('customers/orders', {orders: orders, moment: moment})
        }
    }
}

module.exports = orderController