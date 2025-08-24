const jwt = require("jsonwebtoken");
const User = require("../models/user-model")

const authMiddleware = async(req,res,next) =>{
    const token = req.header("Authorization");

    if(!token){
         return res.status(401).json({ msg: "Unauthorized HTTP , Token Not Provided" });
    }
    //Assuming token is with Bearer and a space we are removing it to get only the token.
    const jwtToken = token.replace("Bearer","").trim();
    try {

        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        
         
        const userData = await User.findOne({email: isVerified.email}).
        select({password:0

        });
        console.log(userData);
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized Token" });
    }
}

module.exports = authMiddleware;