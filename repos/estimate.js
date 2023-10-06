const { MongoClient } = require("mongodb");
const config = require('../config/config');

async function addEstimate(estimate) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('estimate');

        const result = await collection.insertOne(estimate);

        if(result)
            console.log(`Fount user with ID: ${result}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

async function updateEstimate(estimate) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('estimate');

        const result = await collection.replaceOne({ username: estimate.username }, estimate);

        if(result)
            console.log(`Fount user with ID: ${result}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

async function getEstimate(url) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('estimate');

        const result = await collection.findOne({ url: url });

        if(result)
            console.log(`Fount estimate with ID: ${result}`);

        return result;
    } catch (error) {
        console.error('Error finding estimate:', error);
    } finally {
        client.close();
    }
}

module.exports = { 
    addEstimate,
    getEstimate,
    updateEstimate
};