import { MongoClient } from 'mongodb'
import {} from 'dotenv/config'

//get uri from env
const uri = process.env.DB
const client = new MongoClient(uri)

async function connectDB() {
    try {
        await client.connect(uri)
        console.log('Connected to database...')

        //let database = client.db('vectacorp')
        // let result = await database
        //     .collection('employees')
        //     .find({})
        //     .toArray()
        // console.log(result)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}
connectDB()