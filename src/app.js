const path = require('path')
const express = require('express')
const morgan = require('morgan')
const mongosse = require('mongoose')

const app = express()

//connecting db       ,{ useNewUrlParser: true,useUnifiedTopology: true }
mongosse.connect('mongodb://localhost/crud-mongo',{ useNewUrlParser: true,useUnifiedTopology: true })
    .then((db)=>console.log('db connected'))
    .catch((error)=>console.log(erroe))

//importing routes
const indexRoutes = require('./routes/index')

//settings
app.set('port',process.env.PORT || 3000)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))//para recibir solo texto

//routes
app.use('/',indexRoutes)

//starting the server 
app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`);
})