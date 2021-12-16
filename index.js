const path=require('path')
const express=require('express')

const app = express()

// app.get('/',function(req,resp){

//     resp.sendFile(path.join(__dirname,'public','index.html'))
// })

const arr = [
    {
        id:1,
        name:'Person1'

    },
    {
        id:2,
        name:'Person2'
    }
]
app.get('/api/users',(req,resp)=>{
    //return json 
    
    resp.json(arr)
})
app.get('/api/users/:id',(req,resp)=>{
    //resp.send(req.params.id)
    const check_user = arr.some(i=>i.id===parseInt(req.params.id))
    if(check_user)
    {
        resp.json(arr.filter(i => i.id === parseInt(req.params.id)))
    }
    else
    {
        resp.status(400).json({error_message:`No user found with the given id ${req.params.id}`})
    }
})

//set public to static
app.use(express.static(path.join(__dirname,'public')))

const PORT_NUM=  process.env.PORT || 5000

app.listen(PORT_NUM, ()=>console.log(`Server started on ${PORT_NUM}`))