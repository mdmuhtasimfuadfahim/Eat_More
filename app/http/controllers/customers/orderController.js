const Order = require('../../../models/order')
const moment = require('moment')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

function orderController(){
    return{
        store(req, res){
            /*-----------validate request---------*/
            const{ phone, address, stripeToken, paymentType } = req.body
            if(!phone || !address){
                return res.status(422).json({ message: 'All Fields are Required'})
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
                Order.populate(result, {path: 'customerId'}, async (err, placedOrder) =>{
                    // req.flash('success', 'Order Placed Successfully')

                    /*---------stripe payment--------*/
                    if(paymentType === 'card'){
                        stripe.charges.create({
                            amount: req.session.cart.totalPrice * 100,
                            source: stripeToken,
                            currency: 'inr',
                            description: `Food order: ${placedOrder._id}`
                        }).then(()=>{
                            placedOrder.paymentStatus = true
                            placedOrder.paymentType = paymentType
                            placedOrder.save().then((ord)=>{
                                console.log(ord)
                                /*--------emit events-------*/
                                const eventEmitter = req.app.get('eventEmitter')
                                eventEmitter.emit('orderPlaced', ord)
                                delete req.session.cart
                                return res.json({ message: 'Payment and Order done Successfully'});
                            }).catch(err =>{
                                console.log(err)
                            })
                        }).catch(err =>{
                            delete req.session.cart
                            return res.json({ message: 'Payment Failed, You can Pay at Delivery Time'});
                        })
                    }  
                })
            }).catch(err =>{
                return res.status(500).json({ message: 'Something went Wrong'});
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