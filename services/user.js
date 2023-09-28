const userRepo = require("../repos/user");
const inventoryRepo = require("../repos/inventory");
const authService = require("../services/auth");

async function getCart(req, res) {
    try {
        let token = req.token;
        let username = req.username;
        console.log("THis is getcart username: ",username);
        let { cart } = await userRepo.findUser(username);

        return res.status(200).json(cart);

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function updateCart(req, res) {
    try {
        const { operation, itemName } = req.body;
        let username = req.username;
        let user = await userRepo.findUser(username);
        let item = await inventoryRepo.findItem(itemName); 

        if(!item) {
            return res.status(500).json({
                message: "Item does not exist in the collection "+itemName
            });
        }

        if(operation.toLowerCase() == "add") {
            return addToCart(req, res, user, item);
        } else if(operation.toLowerCase() == "delete") {
            return deleteFromCart(req, res, user, item);
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function addToCart(req, res, user, item) {
    try {
        const itemIndex = user.cart.findIndex(cartItem => cartItem.name == item.name);

        if(itemIndex == -1) 
            user.cart.push({ quantity: 1, ...item });
        else
            user.cart[itemIndex].quantity++ ;

        let result = await userRepo.saveUser(user);

        if(!result) {
            return res.status(500).json({
                message: "Failed to add item to cart"
            });
        }

        return res.status(200).json({
            message: "Item added to cart successfully",
            cart: user.cart
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteFromCart(req, res, user, item) {
    try {
        const itemIndex = user.cart.findIndex(cartItem => cartItem.name == item.name);

        if(itemIndex != -1) {
            if(user.cart[itemIndex].quantity > 1)
                user.cart[itemIndex].quantity--;
            else
                user.cart = user.cart.filter((cartItem) => { return cartItem.name != item.name });
        }

        let result = await userRepo.saveUser(user);

        return res.status(200).json({
            message: "Item delteted from cart successfully",
            cart: user.cart
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { 
  getCart,
  updateCart
};