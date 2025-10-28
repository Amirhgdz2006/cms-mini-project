const jwt = require('jsonwebtoken');
const User = require('../../modules/models/user');

exports.authenticateUser = async function(req,res,next){
    try{

        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({ "message": "Unauthorized, No token found" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded){
            return res.status(401).json({ "message": "Invalid token" })
        }
        const user = await User.findById(decoded.id);
        if (!user){
            return res.status(401).json({ "message": "User not found" })
        }

        req.user = user;
        next();

    }
    catch(error){
        res.status(400).json({ "error": error.message })
    }
};