const express=  require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/login',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db = mongoose.connection;
db.on('error',()=>{console.log("error in connection")});
db.once('open',()=>console.log("connected to database"));

app.get('/', (req,res)=>{
     return res.redirect("java.html");
     
}).listen(8000);

app.post('/login',(request,response)=>{
    try{
        const username = request.body.username;
        const password = request.body.password;
        const User  = db.collection('users').findOne({email:username},(err,res)=>{
            if(res===null){
                response.send("such email doesn't exist");
            }
            else if(err)throw err;
            if(res.password===password){
                console.log("login success");
                return response.send("login success");
            }
            else{
                response.send("password incorrect");
            }
        });
       

    }
    catch(error){
        console.log("invalid information");
    }
})
// const port = 8000;
// app.listen(port ,()=>console.log(`listening to port ${port}`))