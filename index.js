var express=require("express");
var app=express();
var PORT=process.env.PORT|| 8080;
var path=require("path");
var mongoose=require("mongoose");
const { stringify } = require("querystring");
app.use("/static",express.static("static"));
app.use(express.urlencoded());
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/customer",{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open',function(){
    console.log("we r connected to db");
})
var kittyschema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        require:true
    },
    area:{
        type:String
    },
    type:{
        type:String
    },
    phone:{
        type:String
    }
})

var contact=mongoose.model('contact',kittyschema);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
})

app.post('/',(req,res)=>{
    var mydata=new contact({
        name:req.body.name,
        email:req.body.email,
        area:req.body.area,
        type:req.body.type,
        phone:req.body.phone
    })
    mydata.save().then(()=>{
        console.log("successful");
        res.sendFile(path.join(__dirname,'views','index.html'));
    }).catch((error)=>{
        console.log(error);
    });
});
app.listen(PORT,()=>{
  console.log(`your server is ready at port ${PORT}`);
})