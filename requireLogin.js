const jwt =require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,'zahid',(err)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in"})
        }
     
        next()
    })
}