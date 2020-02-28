const express=require('express')
const hjs=require('hjs')
const hbs=require('hbs')
const app=express()
const socketio=require("socket.io")
const http=require("http")
const path=require('path')
const bodyparser=require("body-parser")
var exphbs = require('express-handlebars');
app.set('views',__dirname+'/views')
app.engine('html',require('ejs').renderFile)
app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set("view engine","handlebars")
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

const server=http.createServer(app)
const io=socketio(server)

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saketh@123",
    database: "p1"
  });


const publicdirectorypath=path.join(__dirname,'../public')
const port= process.env.PORT || 3000

app.use(express.static(publicdirectorypath))

io.on('connection',(socket) =>{
    socket.on('join',({username,password},callback)=>{
        console.log(password)
    })
})

app.get('/',(req,res) =>{
    
    res.render(path.join(__dirname+'/views/index.html'),{name:'saketh'})
})


app.get('/signup',(req,res) =>{
    res.render(path.join(__dirname+'/views/signin.html'))
})

app.post('/signup',(req,res) =>{
    var username=req.body.username;
    var password=req.body.password;
    console.log(password)
    var sql = "INSERT INTO user set ?";
    
    con.query(sql,{username:username,pasword:password}, function (err, result) {
      if (err) throw err;
      console.log( result.insertedId);
    });
    res.redirect('/')
})

app.get('/login',(req,res) =>{
    res.render(path.join(__dirname+'/views/login.html'))
})

app.post('/login',(req,res) =>{
    var username=req.body.username;
    var pasword=req.body.password;
    var sql="select username,pasword from user where username=? AND pasword=? ";
    con.query(sql,[username,pasword],function(err,result,fields) {
        if(err) {
           return res.redirect('/login')
        }
        if(result.length!=0){
           return res.redirect('/campground')
        }
        res.redirect('/login')
    })
})

app.post('/campground',(req,res)=>{
   const campground=req.body.campground
   const image=req.body.image
   console.log(image)
   var sql="insert into campground set ? ";
    con.query(sql,{campground:campground,image:image},function(err,result){
        if(err) throw Error
         console.log(result.insertId)
      
    })
   res.redirect('/campground')
})

app.get("/campground",(req,res)=>{
    var sql="select campground,image from campground";
    con.query(sql,function(err,result){
        if(err) throw Error
         console.log(result)
        res.render(path.join(__dirname+'/views/allcamp.handlebars'),{campgrounds:result})
    })
  
})
app.get('/campground/new',(req,res)=>{

    res.render(path.join(__dirname+'/views/campground.html'))
  
})

app.get('/campgrounds/:id',(req,res)=>{

    res.render(path.join(__dirname+'/views/show.handlebars'))
})






app.listen(port,()=>{
    console.log('connected')
})


