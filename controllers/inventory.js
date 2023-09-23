const inventoryService = require("../services/inventory");

async function addItem(req, res) {
    return inventoryService.addItem(req, res);
}

async function removeItem(req, res) {
    return inventoryService.removeItem(req, res);
}

async function findItem(req, res) {
    return inventoryService.findItem(req, res);
}

module.exports = {
    addItem,
    removeItem,
    findItem
}