
const express=require("express");
const dataservice=require("./service/dataservice");
const app =express();
app.use(express.json());


app.get('/',(req,res)=>{res.send("this is a get method !!")});

app.post('/',(req,res)=>{res.send("this is a post method !!")});

app.post('/register',(req,res)=>
{
    const result=dataservice.register(req.body.acc,req.body.use,req.body.pass);
   console.log(res.status(result.statusCode).json(result)) ;
}
);
app.post('/login',(req,res)=>
{
    const result=dataservice.login(req.body.acc,req.body.use,req.body.pass);
    console.log(res.status(result.statusCode).json(result))
}
);
app.post('/withdraw',(req,res)=>
{
    const result=dataservice.withdraw(req.body.acc,req.body.use,req.body.pass,req.body.amt);
    console.log(res.status(result.statusCode).json(result))
}
);
app.post('/deposit',(req,res)=>
{
    const result=dataservice.deposit(req.body.acc,req.body.use,req.body.pass,req.body.amt);
    console.log(res.status(result.statusCode).json(result))
}
);


app.put('/',(req,res)=>{res.send("this is a put method !!")});

app.patch('/',(req,res)=>{res.send("this is a patch method !!")});

app.delete('/',(req,res)=>{res.send("this is a delete method !!")});

app.listen(3000,()=>{console.log("server started at port:3000")});
