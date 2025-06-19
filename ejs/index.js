const express = require('express');
const app = express()
const path = require('path');
let database = require('./data.json');
app.use(express.static(path.join(__dirname,'/public/css')));
app.use(express.static(path.join(__dirname,'/public/js')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

const port = 8080;
app.get('/',(req,res)=>{
    res.render('home.ejs');
})
app.get('/rolldice',(req,res)=>{
    let diceVal=Math.floor(Math.random()*6)+1;
    res.render('rollDice.ejs',{value:diceVal})  //or {diceVal}
})
app.get('/instg/:username',(req,res)=>{
    let {username}=req.params;
    let data = database[username];
    res.render('insta.ejs',{data}) 

})

app.listen(port,()=>{
    console.log(`listeneing to port ${port}`);
});