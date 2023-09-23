
const authService  = require('../services/auth');

async function register(req, res) {
  return authService.registerUser(req, res);
}

async function login(req, res) {
  return authService.loginUser(req, res);
}

module.exports = { 
  register,
  login
};
