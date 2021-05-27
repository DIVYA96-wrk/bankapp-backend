const session=require("express-session")
const express=require("express");
const dataservice=require("./service/dataservice");
const app =express();
app.use(express.json());
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}));
app.use((req,res,next)=>{
    console.log("Middleware");
    next();
});

const logMiddleware = (req,res,next)=>{
    console.log(req.body);
    next();
}
app.use(logMiddleware);

const authMiddleware =(req,res,next)=>{
    if(!req.session.currentUser){
        return res.json({
          statusCode:422,
            status: false, 
            message:"Please LOG IN"})
    
      }
      next();
};



app.get('/',(req,res)=>{res.send("this is a get method !!")});

app.post('/',(req,res)=>{res.send("this is a post method !!")});

app.post('/register',(req,res)=>
{
    const result=dataservice.register(req.body.acc,req.body.use,req.body.pass);
  res.status(result.statusCode).json(result) ;
}
);
app.post('/login',(req,res)=>
{
    const result=dataservice.login(req,req.body.acc,req.body.use,req.body.pass);
    res.status(result.statusCode).json(result)
}
);
app.post('/withdraw',authMiddleware,(req,res)=>
{
    const result=dataservice.withdraw(req.body.acc,req.body.use,req.body.pass,req.body.amt);
  res.status(result.statusCode).json(result);
}
);
app.post('/deposit',authMiddleware,(req,res)=>
{
    
    const result=dataservice.deposit(req.body.acc,req.body.use,req.body.pass,req.body.amt);
    res.status(result.statusCode).json(result);
}
);


app.put('/',(req,res)=>{res.send("this is a put method !!")});

app.patch('/',(req,res)=>{res.send("this is a patch method !!")});

app.delete('/',(req,res)=>{res.send("this is a delete method !!")});

app.listen(3000,()=>{console.log("server started at port:3000")});
