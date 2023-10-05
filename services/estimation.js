const estimationRepo = require("../repos/estimation");

async function getEstimation(req, res) {
    try {
        let username = req.username;
        let url = req.params.url;
        let estimation = await estimationRepo.getEstimation(url);
        return res.status(200).json(estimation);

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function addEstimation(req, res) {
    try {
        let username = req.username;
        let { url, cart } = req.body;
        let estimation = { username: username, url: url, cart: cart };

        let existingEstimation= await estimationRepo.getEstimation(url);
        let result = null;

        if(existingEstimation) 
            result = await estimationRepo.updateEstimation(estimation);
        else
            result = await estimationRepo.addEstimation(estimation);

        if(!result) {
            return res.status(500).json({
                message: "Failed to add estimation"
            });
        }

        return res.status(200).json({
            message: "Estimation created successfully",
            estimation: estimation
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { 
    addEstimation,
    getEstimation
};