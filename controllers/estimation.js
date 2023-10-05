const estimationService = require("../services/estimation");

async function addEstimation(req, res) {
  return estimationService.addEstimation(req, res);
}

async function getEstimation(req, res) {
  return estimationService.getEstimation(req, res);
}

module.exports = { 
  addEstimation,
  getEstimation
};
