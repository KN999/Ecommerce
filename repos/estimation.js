const { MongoClient } = require("mongodb");
const config = require('../config/config');

async function addEstimation(estimation) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('estimations');

        const result = await collection.insertOne(estimation);

        if(result)
            console.log(`Fount user with ID: ${result}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

async function updateEstimation(estimation) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('estimations');

        const result = await collection.replaceOne({ username: estimation.username }, estimation);

        if(result)
            console.log(`Fount user with ID: ${result}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

async function getEstimation(url) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('estimations');

        const result = await collection.findOne({ url: url });

        if(result)
            console.log(`Fount estimation with ID: ${result}`);

        return result;
    } catch (error) {
        console.error('Error finding estimation:', error);
    } finally {
        client.close();
    }
}

module.exports = { 
    addEstimation,
    getEstimation,
    updateEstimation
};