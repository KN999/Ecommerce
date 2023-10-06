const config = require("../config/config");
const jwt = require('jsonwebtoken');

function extractToken(req, res, next) {
    const authHeader = req.headers.authorization;
    let decodedToken = null;
    let token = null;

    console.log("Estimation url: ",req.method.toLowerCase() == "get" )
    console.log("Estimation includes: ",req.originalUrl.includes('/api/estimate'))
    if(req.method.toLowerCase() == "get" && req.originalUrl.includes('/api/estimate')) {
        next();
    } else {
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
}

module.exports = {
    extractToken
}