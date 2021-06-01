const db = require('./db');

userdetails = {
  1000: { acno: 1000, actype: "savings", username: "userone", password: "userone", balance: 50000 },
  1001: { acno: 1001, actype: "savings", username: "usertwo", password: "usertwo", balance: 5000 },
  1002: { acno: 1002, actype: "current", username: "userthree", password: "userthree", balance: 10000 },
  1003: { acno: 1003, actype: "current", username: "userfour", password: "userfour", balance: 6000 }
}

const register = (acno, use, pass) => {
  return db.User.findOne({ acno })
    .then(user => {
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "user already exists"
        }
      }
      else {
        const newUser = new db.User({
          acno: acno,
          username: use,
          password: pass,
          balance: 0
        })
        newUser.save();
        return {
          statusCode: 200,
          status: true,
          message: "succesfully registerd"
        }
      }
    })
}




const login = (req, acno, use, password) => {
  return db.User.findOne({ acno, password })
    .then(user => {

      if (user) {

        req.session.currentUser = user;

        return {
          statusCode: 200,
          status: true,
          message: "login succesful"

        }

      }

      else {
        return {
          statusCode: 422,
          status: false,
          message: "Invalid Credentials"

        }

      }
    })
};




const withdraw = (acno, username, password, amt) => {

  var amount = parseInt(amt);

  return db.User.findOne({ acno, password, username })

    .then(user => {
      if (!user) {
        return {
          statusCode: 422,
          status: false,
          message: "Invalid Credinilas"
        }
      }
      if (user["balance"] >= amount) {
        user["balance"] -= amount;
        user.save();
        return {
          statusCode: 200,
          status: true,
          message: "your account has been debited with amount " + amt + " and your available balance is " + user["balance"]
        }

      }

      else {
        return {
          statusCode: 422,
          status: false,
          message: "Insufficient Balance"
        }
      }
    }
    )
};







const deposit = (acno, username, password, amt) => {


  var amount = parseInt(amt);
  return db.User.findOne({ acno, username, password })
    .then(user => {

      if (!user) {
        return {
          statusCode: 422,
          status: false,
          message: "Invalid CREDINIALS"
        }
      }

      user["balance"] += amount;
      user.save();

      return {
        statusCode: 200,
        status: true,
        message: "your account has been credited with amount " + amt + " and your available balance is " + user["balance"]
      }


    })
};



module.exports = { register, login, withdraw, deposit };



