function authController(){

    return{
        login(req, res){
            res.render('auth/login')
        },
        registration (req, res) {
            res.render('auth/registration')
        }
    }

}

module.exports = authController