/* TODO: Refactor this */
const config = require('../config/config');
const { MongoClient } = require("mongodb");

async function registerUser(username, password) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('users');

        const newUser = {
            username: username,
            password: password,
            cart: [],
            order: []
        };

        const result = await collection.insertOne(newUser);

        if(result !== null && result !== undefined)
            console.log(`User inserted with ID: ${result.insertedId}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

async function findUser(username) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('users');

        const result = await collection.findOne({ username: username });

        if(result)
            console.log(`Fount user with ID: ${result}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

module.exports = {
    registerUser,
    findUser
}