const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to new server via controller");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exist" });
    }
    // hash the password using bcrypt method 1
    // const saltRound = 10;
    // const hash_Password = await bcrypt.hash(password,saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password, 
    });

    res
      .status(201)
      .send({
        msg: "userCreated",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      }); //status shoul be 201 when something new is created.
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};

//login logic

const login = async (req,res) => {
  try {
    const {email,password} = req.body;
        const userExist = await User.findOne({ email: email });
if (!userExist) {
  return res.status(400).json({ msg: "Invalid Crdentials" });
  }

  // compare the password using bcrypt.compare method 1
  // const isMatch = await bcrypt.compare(password,userExist.password);


  // compare the password using bcrypt.compare method 2
  const isMatch = await userExist.comparePassword(password);


  if (isMatch) {
    res
      .status(200)
      .send({
        msg: "Login Successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
  }else{
    return res.status(401).json({ msg: "Invalid Crdentials" });
  }

  } catch (error) {
    console.error(error);
    
  }
}

//User logic to send user data
const user = async(req,res) =>{
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
    
  }
}


module.exports = { home, register, login,user };
