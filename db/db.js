// db.js
const { MongoClient } = require("mongodb");
const config = require("../config/config");

let client = null;

async function connectToDatabase() {
  if(client === null) {
    client = new MongoClient(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client.db('ecommerce');
  } catch (err) {
    console.error(err);
  }
}

async function disconnectDatabase() {
  if(client !== null)
    client.close();
} 

module.exports = {
  connectToDatabase,
  disconnectDatabase,
  getDatabase: () => database, // Export the client to use in other parts of your application if needed
};
