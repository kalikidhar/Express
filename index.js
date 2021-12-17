const path=require('path')
const express=require('express')


const app = express()
const arr = require("./users_data")

const {engine} = require('express-handlebars')

//HANDLE BARS MIDDLEWARE FOR RENDERING STUFF

app.engine('handlebars',engine({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/',(req,resp) => resp.render('index',{
    title:'My User App',
    users:arr
}))


//set public to static
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/users',require('./routes/api/users'))

const PORT_NUM=  process.env.PORT || 5000

app.listen(PORT_NUM, ()=>console.log(`Server started on ${PORT_NUM}`))