const { json } = require('body-parser');
const express =require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const requireLogin = require('./requireLogin')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


console.log(localStorage.getItem('myFirstKey'));
let tasks = new Array();

router.post('/signup',(req,res)=>{
    
    const{email,password} = req.body
    if(!email || !password){
        
       return res.status(422).json({error:"please add all the field"})
    }
     
            let Id=(Math.floor(Math.random() * 10))
        let serialize_user = JSON.stringify({
            'Id':Id,
            'email': email,
            'password': password,
        });

        localStorage.setItem('user',serialize_user);
        
        let object = localStorage.getItem('user');
        let jsonUser = JSON.parse(object);
        
        res.status(201).send({'user':{
            Id:jsonUser.Id,
            email: jsonUser.email
           
        }});

          
})

router.post('/signin',(req,res)=>{
    const {email,password}= req.body
    if(!email || !password){
        return res.status(422).json ({error:"please add email or password"})
    }
    let object = localStorage.getItem('user');
    let jsonUser = JSON.parse(object);
    let localEmail = jsonUser.email;
    
        if(localEmail != email){
            return res.status(422).json ({error:"Invalid Email or Password"})
        }else{
            if(password == jsonUser.password){
                const token = jwt.sign({_id:1234},'zahid')
                res.json({JWT:token})
            }else{
                return res.status(422).json ({error:"Invalid Email or Password"})
            }
        }
})
router.get('/user',requireLogin,(req,res)=>{
    let Id=(Math.floor(Math.random() * 10))
    let object = localStorage.getItem('user');
    let jsonUser = JSON.parse(object);
    let localEmail = jsonUser.email;
    res.json({'user':{Id,localEmail}})
})

router.post("/createTask",requireLogin,(req,res)=>{
    let Id=(Math.floor(Math.random() * 10))
    const task= req.body
   
    if(!task){
        return res.status(422).json({error:"Please add task detail "})
    }
    task.id=Id
    tasks.push(task)
    var JSONReadytasks=JSON.stringify(tasks)
    localStorage.setItem(tasks,JSONReadytasks)
   
res.status(201).send({"task":task
});
})
router.post("/listTask",requireLogin,(req,res)=>{
    if(tasks==''){
        return res.status(422).json({error:"No task available "})}
        let finalTasks=JSON.parse(localStorage.getItem(tasks))
        res.status(201).send({"task":finalTasks})
    
})
module.exports = router;