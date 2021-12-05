const { createServer } = require('http');
const mongoInstance = require('../db');

async function handler(request, response) {
    const client = await mongoInstance.connectDb(),
    database = client.db("cache-nodejs"),
    customers = database.collection("customers"),
    allCustomers = await customers.find({});
        
    response.writeHead(200)
    response.end(JSON.stringify(allCustomers))
    return
}

createServer(handler)
    .listen(4000, () => console.log('no-cached: listening to 4000'))