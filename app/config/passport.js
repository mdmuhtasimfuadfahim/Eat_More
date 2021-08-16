const LocalStratey = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt') 


function initPassport(passport){
    passport.use(new LocalStratey({ usernameField: 'email' }, async (email, password, done) =>{
       
        /*-----------check if email exist--------*/
        const user = await User.findOne({ email: email })
        if(!user){
            return done(null, false, { message: 'No User with this Email' })
        }

        /*--------------compare password with hashed password------------*/
        bcrypt.compare(password, user.password).then(match =>{
            if(match){
                return done(null, user, { message: 'Logged in Successfully'})
            }

            return done(null, false, { message: 'Wrong Email or Password'})
        }).catch(err =>{
            return done(null, false, { message: 'Something Went Wrong'})
        })
    }))

    /*-----------serialize user------------*/ 
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    /*-----------deserialize user------------*/
    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user) =>{
            done(err, user)
        })
    })
}


module.exports = initPassport