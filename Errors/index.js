const express = require('express');
const app = express();
const ExpressError = require('./ExpressError.js');


//Middleware with path 
let tokenCheck = ('/api',(req,res,next)=>{          
    let {token} = req.query;
    if(token==="giveaccess"){
        return next();
    }
    throw new ExpressError(401,"ACESS DENIED");     //401 Status code for Unauthorized  
});


//Root page
app.get("/",(req,res)=>{
    res.send("I am root");
});

app.get("/api",tokenCheck,(req,res)=>{      //token check middleware in get route /api?any_querys will work except /something
    res.send("data");
});

//Admin access Forbidden
app.get('/admin',(req,res)=>{
    throw new ExpressError(403,'Access to Admin is Frobidden')
});

app.get('/err',(req,res)=>{
    abcd=abcd;
});

//Error Handling Middleware
app.use((err,req,res,next)=>{
    let {status = 500,message="some error"} = err;      //In custom error , status code is needed which can lead to undefined status code error . Express default handler set status code to 500 .
    res.status(status).send(message);

    // next(err);                      //next will call next route or middleware 
});                                 //next(err) will call next error handling middleware , if none then express default error handling middleware

app.listen(5050,()=>{
    console.log("server is listening");
})
