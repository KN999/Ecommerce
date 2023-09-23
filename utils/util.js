const config = require("../config/config");
const jwt = require('jsonwebtoken');

function extractToken(req, res, next) {
    const authHeader = req.headers.authorization;
    let decodedToken = null;
    let token = null;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        decodedToken = null;
    }
  
    if(authHeader)
        token = authHeader.split(' ')[1];
  
    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            console.error('Invalid token:', err);
            decodedToken = null;
        } else {
            console.log('Valid token:', decoded);
            decodedToken = decoded;
        }   
    });
  
    if(decodedToken) {
        req.token = token;
        req.username = decodedToken.username
        next();
    } else {
        return res.status(401).json({ message: "Unauthorised" });;
    }
}

module.exports = {
    extractToken
}