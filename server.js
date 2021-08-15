const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const Emitter = require('events')
const morgan = require('morgan')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 4000


/*-----
assets
-----*/
app.use(express.static('public'))
/*------------------
set template engine
------------------*/
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('home')
})

app.get('/cart', (req, res) =>{
    res.render('customers/cart')
})

app.get('/registration', (req, res) =>{
    res.render('auth/registration')
})

app.get('/login', (req, res) =>{
    res.render('auth/login')
})



/*-----------
event emitter
------------*/
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

/*----------
log requests
-----------*/
app.use(morgan('tiny'))


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})