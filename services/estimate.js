const estimateRepo = require("../repos/estimate");

async function getEstimate(req, res) {
    try {
        let username = req.username;
        let url = req.params.url;
        let estimate = await estimateRepo.getEstimate(url);
        return res.status(200).json(estimate);

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function addEstimate(req, res) {
    try {
        let username = req.username;
        let { url, cart } = req.body;
        let estimate = { username: username, url: url, cart: cart };

        let existingEstimate= await estimateRepo.getEstimate(url);
        let result = null;

        if(existingEstimate) 
            result = await estimateRepo.updateEstimate(estimate);
        else
            result = await estimateRepo.addEstimate(estimate);

        if(!result) {
            return res.status(500).json({
                message: "Failed to add estimate"
            });
        }

        return res.status(200).json({
            message: "Estimate created successfully",
            estimate: estimate
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { 
    addEstimate,
    getEstimate
};