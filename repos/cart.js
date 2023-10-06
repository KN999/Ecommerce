const { MongoClient } = require("mongodb");
const config = require('../config/config');

async function updateCart(username, cart) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('cart');

        const result = await collection.replaceOne({ username: username }, { username: username, cartItem: cart });

        if(result)
            console.log(`Fount user with ID: ${result}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

async function findCart(username) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('cart');

        const result = await collection.findOne({ username: username });

        if(result)
            console.log(`Fount user with ID: ${result}`);

        return result.cartItem;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

async function createCart(username) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('cart');

        const cart = {
            username: username,
            cartItem: [],
        };

        const result = await collection.insertOne(cart);

        if(result !== null && result !== undefined)
            console.log(`User inserted with ID: ${result.insertedId}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

module.exports = { 
  updateCart,
  findCart,
  createCart
};