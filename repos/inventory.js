const { MongoClient } = require("mongodb");
const config = require('../config/config');

async function addItem(item) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('items');

        const newItem= {
            name: item.name,
            price: item.price,
            image: item.image,
        };

        const result = await collection.insertOne(newItem);

        if(result !== null && result !== undefined)
            console.log(`Item inserted with ID: ${result.insertedId}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

async function findItem(itemName) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('items');

        const result = await collection.findOne({ name: itemName });

        if(result)
            console.log(`Fount item with ID: ${result}`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

async function removeItem(itemName) {
    const client = new MongoClient(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const database = client.db('ecommerce');
        const collection = database.collection('items');

        const result = await collection.deleteOne({ name: itemName });
        console.log(`Deleted ${result.deletedCount} document`);

        return result;
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.close();
    }
}

module.exports = {
    addItem,
    removeItem,
    findItem
}