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




const login = (req, acno, username, password) => {
  return db.User.findOne({ acno, username, password })
    .then(user => {

      if (user) {

        req.session.currentUser = acno;


        return {
          statusCode: 200,
          status: true,
          message: "login succesful",
          namee: user.username,
          acno: user.acno



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




const withdraw = (req, acno, password, amt) => {

  var amount = parseInt(amt);

  return db.User.findOne({ acno, password })

    .then(user => {
      if (!user) {
        return {
          statusCode: 422,
          status: false,
          message: "Invalid Credinilas"
        }
      }
      console.log(req.session.currentUser);
      if (req.session.currentUser != acno) {
        return {
          statusCode: 422,
          status: false,
          message: "Operation denied"
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
    })
};









const deposit = (acno, password, amt) => {
  var amount = parseInt(amt);
  return db.User.findOne({ acno, password })
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
        message: "your account has been debited with amount " + amt + " and your available balance is " + user["balance"]
      }

    })
};


module.exports = { register, login, withdraw, deposit };



