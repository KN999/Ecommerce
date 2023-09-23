const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const authRepo = require("../repos/auth");

const saltRounds = 10;

async function registerUser(req, res) {
    try {
        const { username, password } = req.body;

        let user = await authRepo.findUser(username);

        if(user) {
            return res.status(401).json({
                message: "User already exist with that username: "+username,
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        let result = await authRepo.registerUser(username, hashedPassword);
        const token = jwt.sign({ username: username }, config.secretKey, {
            expiresIn: "1h",
        });

        return res.status(200).json({
            message: "User created successfully with username: "+username,
            token: "Bearer " + token
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        let user = await authRepo.findUser(username);

        if(!user) {
            return res.status(401).json({
                message: "No user exist with username: "+username,
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ username: user.username }, config.secretKey, {
            expiresIn: "1h",
        });
    
        return res.json({ token: "Bearer " + token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function verifyJWT(token) {
    let username = await getUsernameFrToken(token);
    let user = await authRepo.findUser(username);
    return user;
}

async function getUsernameFrToken(token) {
    try {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                console.error('Invalid token:', err);
                return null;
            } else {
                const username = decoded.username;
                console.log('Username:', username);
                return username;
            }
        });
    } catch(error) {
        console.error('Error inserting user:', error);
        return null;
    }
}

module.exports = {
    registerUser,
    loginUser,
    verifyJWT,
    getUsernameFrToken
}