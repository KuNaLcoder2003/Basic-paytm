const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const jwt_key = process.env.JWT_KEY;

function authMiddleware(req,res,next){
    const auhToken = req.headers.authorization

    try {
        if(!auhToken || !auhToken.startsWith('Bearer ')){
            return res.status(401).json({})
        }
        const token = auhToken.split(' ')[1];
        const verified = jwt.verify(token , jwt_key)
        if(verified){
            req.id = verified.id;
            next()
        }
        else {
            return res.status(401).json({})
        }
    } catch (error) {
        console.log('auth.js');
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
}
module.exports = authMiddleware