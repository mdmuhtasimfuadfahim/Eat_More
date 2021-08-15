const Menu = require('../../models/menu')


function homeController(){
    return{
        async index(req, res) {

            const menus = await Menu.find()
            return res.render('home', {menus: menus})
            // Menu.find().then((menus)=>{
            //     console.log(menus)
            //     res.render('home', {menus: menus})
            // })
            
        }
    }
}

module.exports = homeController