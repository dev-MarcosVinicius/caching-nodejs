const { createServer } = require('http');
const mongoInstance = require('../db');
const redis = require("redis");
const redisCache = redis.createClient({
    url: 'redis://redis:6379'
});
const CACHE_LIMIT = 100;
const userTokenCache = 'Aqui fica o token de parametrização';

redisCache.connect();

async function handler(request, response) {
    const customersCached = redisCache.get(userTokenCache);
    
    if (customersCached) {
        response.writeHead(200)
        response.end(JSON.stringify(customersCached));
        return
    } else { 
        const client = await mongoInstance.connectDb(),
        database = client.db("cache-nodejs"),
        customers = database.collection("customers"),
        allCustomers = await customers.find({});

        redisCache.set(userTokenCache, JSON.stringify(allCustomers));
        redisCache.PEXPIRE(userTokenCache, CACHE_LIMIT)
        
        response.writeHead(200)
        response.end(JSON.stringify(allCustomers))
        return
    }
}

createServer(handler)
    .listen(3000, () => console.log('cached: listening to 3000'))