const faker = require('faker');
const mongoInstance = require('./db');
const MAX_ITEMS_PER_INTERVAL = 100
const INTERVAL = 500

async function runInterval() {
    const client = await mongoInstance.connectDb(),
    database = client.db("cache-nodejs"),
    customers = database.collection("customers");

    let promises = [];
    for (let i = 0; i < MAX_ITEMS_PER_INTERVAL; i++) {
        const result = customers.insertOne({
            name: faker.name.title(),
            cel_phone: faker.lorem.word(2)
        })

        promises.push(result)
    }
}

setInterval(runInterval, INTERVAL);
console.log(`Criando os customers: ${MAX_ITEMS_PER_INTERVAL} items per interval of ${INTERVAL}ms`)