const express = require('express');
const app=express();
const path = require('path');
const { v4 : uuidv4 } = require('uuid');
 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
var methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(methodOverride('_method'))
let port = 8080;
let posts = [
    {
        id:uuidv4(),
        username:'kunal',
        content:'eyes are soul of the heart'
    },
    {
        id:uuidv4(),
        username:'adam',
        content:'dont eat that apple'
    },
    {
        id:uuidv4(),
        username:'socrates',
        content:'there is only one good knowledge , and one evil ignorance.'
    }
];
app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
});

app.post('/posts',(req,res)=>{
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});
    res.redirect('/posts');
});

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');  
});

app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    console.log(post);
    res.render('singlepost.ejs',{post});
    // res.send('post')
});

app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    let content=req.body.content;
    post.content=content;
    res.redirect('/posts/');
});

app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id!=p.id);
    res.redirect('/posts/'); 
});

app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render('edit.ejs',{post}); 
});


app.listen(port,()=>{
    console.log('server listening at port 8080');
});