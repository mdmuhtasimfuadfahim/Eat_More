const Menu = require('../../models/menu')
const User = require('../../models/user')
const moment = require('moment')

function homeController(){
    return{
        async index(req, res) {

            const menus = await Menu.find()
            return res.render('home', {menus: menus})
            // Menu.find().then((menus)=>{
            //     console.log(menus)
            //     res.render('home', {menus: menus})
            // })
            
        },

        async customers(req, res){
            const users = await User.find()
            console.log(users)
            return res.render('admin/users', {users: users, moment: moment})
        }
    }
}

module.exports = homeController