userdetails={
    1000:{acno:1000,actype:"savings",username:"userone",password:"userone",balance:50000},
    1001:{acno:1001,actype:"savings",username:"usertwo",password:"usertwo",balance:5000},
    1002:{acno:1002,actype:"current",username:"userthree",password:"userthree",balance:10000},
    1003:{acno:1003,actype:"current",username:"userfour",password:"userfour",balance:6000}
}

const register=  (acc,use,pass) =>{
    var user=userdetails;

    if(acc in user){
      return {
          statusCode:422,
          status:false,
          message:"user already exists"
      }
     
    }
    else{
      user[acc]={
        acc:acc,
        username:use,
        password:pass,
        balance:0
      }
      
      
      return {
        statusCode:200,
        status: true,
        message:"succesfully registerd"
    }
     
    }
};

 

const login= (acc,use,pass) => {
  var users= userdetails;
  if(acc in users)
  {
      if(use==users[acc]["username"] && pass==users[acc]["password"]){
        
        return {
          statusCode:200,
          status:true,
          message: "login succesful"

        }
        
      }

      else{
        return {
          statusCode:422,
          status:false,
          message: "Invalid username or password"

        }
          
      }
  }
  else{
    return {
      statusCode:422,
          status:false,
      message: "Invalid account number"

    }
     
  }
};

const withdraw= (acc,use,pass,amt)=>{
  
  var amount=parseInt(amt);
  let user=userdetails;
  if(acc in user)
  {
    if(pass==user[acc]["password"] && use==user[acc]["username"]){
      if(user[acc]["balance"] >= amount){
      user[acc]["balance"]-=amount;
      
      return {
        statusCode:200,
        status: true, 
        message:"your account has been debited with amount "+amt+" and your available balance is "+user[acc]["balance"]}}
      else{
        return {
          statusCode:422,
          status: false, 
          message:"Insufficient Balance"}}
      }
      
      else{
        return {
        statusCode:422,
          status: false, 
          message:"Invalid username or password"}} }
    

      else{
        return {
          statusCode:422,
            status: false, 
            message:"Invalid account number"}}
      
  


}
const deposit= (acc,use,pass,amt)=>{
  
  var amount=parseInt(amt) ;
  let user=userdetails;
  if(acc in user)
  {
    if(pass==user[acc]["password"] && use==user[acc]["username"]){
      user[acc]["balance"]+=amount;
      
      return {
        statusCode:200,
        status: true, 
        message:"your account has been credited with amount "+amt+" and your available balance is "+user[acc]["balance"]}}
   
      
      
      else{
        return {
        statusCode:422,
          status: false, 
          message:"Invalid username or password"}} }
    

      else{
        return {
          statusCode:422,
            status: false, 
            message:"Invalid account number"}}
      
  


}

module.exports={register,login,withdraw,deposit};



