const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },

});

// hash the password using bcrypt method 2 using pre method of schema

userSchema.pre("save", async function (next) {
   // console.log("pre method",this); //"this" line will provide us the data to be stored in database.
   const user = this;

   if (!user.isModified("password")) {
    next();
   }

   try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_Password = await bcrypt.hash(user.password,saltRound);
    user.password = hash_Password;
   } 
   catch (error) {
        next(error);
   }
    
})

// Json web token

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId : this._id.toString(),
            email :this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
    );
        
    } catch (error) {
        console.error(error);
    }
}

//compare the password using bcrypt.compare method 2
userSchema.methods.comparePassword = async function (password) {
    try {
        return bcrypt.compare(password,this.password);

        } catch (error) {
            console.error(error);
            }
            };

//define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;