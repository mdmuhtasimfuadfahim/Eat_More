const Order = require('../../../models/order')
const moment = require('moment')

function adminOrderController(){
    return{
        index(req, res){
            Order.find({ status: { $ne: 'confirmed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders)=>{
                if(req.xhr){
                    console.log(orders)
                    return res.json(orders)
                }else{
                    return res.render('admin/orders')
                }

            })
        }
    }
}


module.exports = adminOrderController