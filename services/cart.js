const cartRepo = require("../repos/cart");
const inventoryRepo = require("../repos/inventory");
const authService = require("./auth");

async function getCart(req, res) {
    try {
        let token = req.token;
        let username = req.username;
        console.log("THis is getcart username: ",username);
        let cart = await cartRepo.findCart(username);

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
        let cart = await cartRepo.findCart(username);
        let item = await inventoryRepo.findItem(itemName); 

        if(!item) {
            return res.status(500).json({
                message: "Item does not exist in the collection "+itemName
            });
        }

        if(operation.toLowerCase() == "add") {
            return addToCart(req, res, username, cart, item);
        } else if(operation.toLowerCase() == "delete") {
            return deleteFromCart(req, res, username, cart, item);
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function addToCart(req, res, username, cart, item) {
    try {
        const itemIndex = cart.findIndex(cartItem => cartItem.name == item.name);

        if(itemIndex == -1) 
            cart.push({ quantity: 1, ...item });
        else
            cart[itemIndex].quantity++ ;

        let result = await cartRepo.updateCart(username, cart);

        if(!result) {
            return res.status(500).json({
                message: "Failed to add item to cart"
            });
        }

        return res.status(200).json({
            message: "Item added to cart successfully",
            cart: cart
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteFromCart(req, res, username, cart, item) {
    try {
        const itemIndex = cart.findIndex(cartItem => cartItem.name == item.name);

        if(itemIndex != -1) {
            if(cart[itemIndex].quantity > 1)
                cart[itemIndex].quantity--;
            else
                cart = cart.filter((cartItem) => { return cartItem.name != item.name });
        }

        let result = await cartRepo.updateCart(username, cart);

        return res.status(200).json({
            message: "Item delteted from cart successfully",
            cart: cart
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