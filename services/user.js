const userRepo = require("../repos/user");
const inventoryRepo = require("../repos/inventory");
const authService = require("../services/auth");

async function addToCart(req, res) {
    try {
        const { name, quantity } = req.body;
        let token = req.token;
        let username = req.username;
        let user = await userRepo.findUser(username);
        let item = await inventoryRepo.findItem(name); 

        console.log("User: ",JSON.stringify(user));

        if(!item) {
            return res.status(401).json({
                message: "Item does not exist in the collection "+name
            });
        }

        let newItem = { quantity: quantity, ...item }
        
        if(user.cart)
            user.cart.push(newItem);
        else
            user.cart = [newItem];

        let result = await userRepo.saveUser(user);

        if(!result) {
            return res.status(401).json({
                message: "Failed to add item to cart"
            });
        }

        return res.status(200).json({
            message: "Item added to cart successfully"
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function getCart() {
    try {
        let token = req.token;
        let username = await authService.getUsernameFrToken(token);
        let user = await userRepo.findUser(username);

        return res.status(200).json({
            cart: user.cart
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function updateCart(req, res) {
    try {
        let token = req.token;
        let username = await authService.getUsernameFrToken(token);
        let user = await userRepo.findUser(username);
        let cart = req.body;

        if(cart) {
            user.cart = cart;
        }

        let result = await userRepo.saveUser(user);

        return res.status(200).json({
            message: "Cart updated successfully",
            cart: result
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteFromCart(req, res) {
    try {
        let token = req.token;
        let username = await authService.getUsernameFrToken(token);
        let itemName = req.params.itemName;
        let user = await userRepo.findUser(username);

        user.cart = user.cart.filter((item) => {
            return item.name != itemName
        })

        let result = await userRepo.saveUser(user);

        return res.status(200).json({
            message: "Item delteted from cart successfully",
            cart: result
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { 
  addToCart,
  getCart,
  updateCart,
  deleteFromCart
};