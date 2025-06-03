import { MongoClient } from "mongodb";
import {} from 'dotenv/config'

const uri = process.env.DB 
const client = new MongoClient(uri)

async function retrieveAll() {
    try {
        //console.log("running retrieveAll")
        await client.connect(uri)
        console.log("retrieveAll has connected to db")
        let database = client.db('vectacorp')
        let result = await database
            .collection('employees')
            .find({})
            .toArray()
        console.log(result)
        return result
    }catch (err){
        console.log(err)
        return err
    }finally {
        await client.close()
    }
}
export default retrieveAll