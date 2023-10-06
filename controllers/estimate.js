const estimateService = require("../services/estimate");

async function addEstimate(req, res) {
  return estimateService.addEstimate(req, res);
}

async function getEstimate(req, res) {
  return estimateService.getEstimate(req, res);
}

module.exports = { 
  addEstimate,
  getEstimate
};
