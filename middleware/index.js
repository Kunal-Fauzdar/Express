const express = require('express');
const app = express();

//MiddleWare can either send response and end the request-response cycle or call next(another middleware or route)
//Middle ware will get executed after request and before resposne . Even for invalid paths (not matching our route) 
//Middle should be write at first , because if request match the path then response will be sent without executing Middlewares. 
// app.use((req,res,next)=>{
//     console.log("Hello there ! I am 1st Middleware");
//     next();                 //statements after next() are also executed . some programmers write return next();
//     //return next();
// });

// app.use((req,res,next)=>{
//     console.log("Hello there ! I am 2nd Middleware");
//     next();
// });

//Logger - storing all requests info 
//Morgan - Famous
// app.use((req,res,next)=>{
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method,req.hostname,req.path,req.time);  //GET localhost / Thu Jun 19 2025 18:32:39 GMT+0530 (India Standard Time)
//     next();
// });

//Middleware with path 
let tokenCheck = ('/api',(req,res,next)=>{          
    let {token} = req.query;
    if(token==="giveaccess"){
        return next();
    }
    res.send('Acess Denied');
});

app.get("/",(req,res)=>{
    res.send("I am root");
});

app.get("/api",tokenCheck,(req,res)=>{      //token check middleware in get route /api?any_querys will work except /something
    res.send("data");
});

app.get('/random',(req,res)=>{
    res.send("I an Random Page.")
});



//Invalid url 
// app.use((req,res)=>{
//     res.status(404).send('Page not Found');
// });

app.listen(5050,()=>{
    console.log("server is listening");
})
