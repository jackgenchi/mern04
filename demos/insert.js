import { MongoClient } from 'mongodb'
import {} from 'dotenv/config'

//get uri from env
const uri = process.env.DB
const client = new MongoClient(uri)

let employee = {
    name:'brad breadford',
    extension: 1118,
    email: 'brad@vectacorp.com',
    title: 'bread',
    dateHired: Date.now(),
    currentlyEmployed: false
}

async function insertSingle() {
    try {
        await client.connect(uri)
        console.log('Connected to database...')
        let database = client.db('vectacorp')
        await database
            .collection('employees')
            .insertOne(employee)
        console.log('1 document inserted')
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}
insertSingle()