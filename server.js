require('dotenv').config()

const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const Emitter = require('events')
const morgan = require('morgan')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 4000
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')
const passport = require('passport')



/*----------
log requests
-----------*/
app.use(morgan('tiny'))


/*-----------------
database connection
------------------*/ 
const connectDB = require('./app/config/db')
const { connection } = require('mongoose')
connectDB()


/*-----------
session store
------------*/ 
const mongodbstore = new MongoDbStore({
    mongoUrl: process.env.MONGO_CONNECTION_URL,
    dbName: "foodShop",
    stringify: false
})


/*-----------
event emitter
------------*/
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)


/*------------
session config
-------------*/ 
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongodbstore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 5} /*----- 5 hours-------*/
}))


/*-------------
passport config
--------------*/ 
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())


/*-----
assets
-----*/
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())


/*-----------------
golbal  middleware
-----------------*/ 
app.use((req, res, next)=>{
    res.locals.user = req.user
    res.locals.session = req.session
    next()
})


/*------------------
set template engine
------------------*/
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

/*-------------
routing control
--------------*/ 
require('./routes/web')(app)


const server = app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})


/*---------------
socket operation
---------------*/
const io = require('socket.io')(server)
io.on('connection', (socket)=>{
    /*-------join--------*/ 
    // console.log(socket.id)
    socket.on('join', (orderId)=>{
        // console.log(orderId)
        socket.join(orderId)
    })
})

eventEmitter.on('orderPlaced', (data)=>{
    io.to('adminRoom').emit('orderPlaced', data)
})
