const { MongoClient } = require('mongodb');

function getClientDb() {
    const uri = "mongodb://mongo-db:27017/cache-nodejs";

    return new MongoClient(uri);
}

exports.connectDb = async function() {
    const client = getClientDb();
 
    await client.connect();

    return client;
}

exports.disconnectDb = async function() {
    const client = getClientDb();

    await client.close();

    console.log('DB Disconnected!');
}

