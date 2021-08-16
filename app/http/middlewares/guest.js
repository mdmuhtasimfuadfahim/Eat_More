

function guestActivity(req, res, next){
    if(!req.isAuthenticated()){
        return next()
    }

    return res.redirect('/')
}


module.exports = guestActivity