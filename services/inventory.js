const inventoryRepo = require("../repos/inventory");

async function addItem(req, res) {
    try {
        const { name, price, image } = req.body;

        let newItem = {
            name: name,
            price: price,
            image: image
        }

        let item = await inventoryRepo.findItem(name);

        if(item) {
            return res.status(401).json({
                message: "Item already exist in the collection "+name
            });
        }

        let result = await inventoryRepo.addItem(newItem);

        if(!result) {
            return res.status(401).json({
                message: "Failed to add item"
            });
        }

        return res.status(200).json({
            message: "Item added successfully",
            item: newItem
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function removeItem(req, res) {
    try {
        const name = req.params.itemName;

        let item = await inventoryRepo.findItem(name);

        if(!item) {
            return res.status(401).json({
                message: "Item doesnot exist in the collection "+name
            });
        }

        let result = await inventoryRepo.removeItem(name);

        if(!result) {
            return res.status(401).json({
                message: "Failed to add item"
            });
        }
    
        return res.status(200).json({
            message: "Item added successfully",
            item: result
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function findItem(req, res) {
    try {
        const itemName = req.params.itemName;

        let item = await inventoryRepo.findItem(itemName);
        res.status(200).json(item);

    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    addItem,
    removeItem,
    findItem
}