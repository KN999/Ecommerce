const { MongoClient } = require("mongodb");
const config = require('../config/config');

async function saveUser(user) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('users');

        const result = await collection.replaceOne({ username: user.username }, user);

        if(result)
            console.log(`Fount user with ID: ${result}`);

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
  saveUser,
  findUser
};