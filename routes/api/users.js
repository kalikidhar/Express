const express = require('express')
const router = express.Router()
const arr=require('../../users_data')
const uuid=require('uuid')





router.get('/',(req,resp)=>{
    //return json 
    
    resp.json(arr)
})
router.get('/:id',(req,resp)=>{
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

//creating a user -> post req

router.post('/',(req,resp) => {


    //  resp.send(req.body)
   
    const new_user ={
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'Active_User'
    }

    if(!new_user.name || !new_user.email)
    {
        return resp.status(400).json(
            {
                error_message:'Please provide name and email'
            }
        )
    }

    arr.push(new_user)
    //resp.json(arr)
    resp.redirect('/')
})

//Updating user details -> put req

router.put('/:id',(req,resp) => {
    const check_user = arr.some(i=>i.id === parseInt(req.params.id))
    if(check_user)
    {
        const update_user = req.body;
        arr.forEach(i => {
            //loop thru to check for id sent in the upd req
            if(i.id === parseInt(req.params.id)) {
                i.name = update_user.name ? update_user.name : i.name
                i.email = update_user.email ? update_user.email : i.email
                
                //send the resp
                resp.json({message:'Updated the user',i:i})
            }
        })
    }
    else{
             resp.status(400).json({
                 error_message:`No user with the id ${req.params.id} found`
             })
    }

})





module.exports=router