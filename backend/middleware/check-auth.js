const jwt = require("jsonwebtoken");

module.exports = (req,res,next ) =>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,"mce_s_secret_cyode_do_not_steal_it_fella");
    req.authData = {email:decodedToken.email, authId:decodedToken.authId};
    next();
    }catch(error){
        res.status(401).json({message:"Auth failed is it?"});
    }
};